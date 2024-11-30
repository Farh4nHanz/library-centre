import { CookieOptions, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "@/config/logger";

/** @interfaces */
import { RequestWithCookies, User } from "@/interfaces";

/** @types */
import { DecodedToken } from "@/types";

/** @models */
import UserModel from "@/models/userModel";

/** @libs */
import CustomError from "@/lib/customError";
import hashPassword from "@/lib/hashPassword";
import { generateAccessToken, generateRefreshToken } from "@/lib/generateToken";
import mongoose from "mongoose";

/**
 * Class based controller for user authentication.
 * All methods will be used in authRouter.
 *
 * @method `registerUser`
 * @method `loginUser`
 * @method `logoutUser`
 */
class AuthController {
  /**
   * This method is used to registering new user.
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns {Promise<void>} Response with status code 201, success message and user object.
   *
   * @throws {CustomError} An error with status code 400, 409 and error message.
   *
   * @example
   * router.post("/register", authController.registerUser);
   */
  registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, email, password } = req.body; // destructure the request body

      if (!username || !email || !password)
        throw new CustomError("Please fill all fields!", 400); // check if all fields are filled

      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!validEmail) throw new CustomError("Invalid email!", 400); // check if email is valid

      const userExist = await UserModel.findOne({ email });
      if (userExist) throw new CustomError("Email already exists.", 409); // check if email already exists

      const hashedPassword = await hashPassword(password); // hash the password

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      }); // create new user

      await newUser.save(); // save the new user to database

      res.status(201).json({
        message: "Register success! You can now log in.",
      }); // send response
    } catch (err: unknown) {
      logger.error(err); // logging error
      next(err); // pass error to error middleware
    }
  };

  /**
   * This method is used to log in a user.
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns {Promise<void>}
   * - Access token and refresh token in http only cookies.
   * - Response with status code 200, message and user object.
   *
   * @throws {CustomError} An error with status code 400, 401, 404 and error message.
   *
   * @example
   * router.post("/login", authController.loginUser);
   */
  loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = req.body; // destructure the request body

      if (!email || !password)
        throw new CustomError("Please fill all fields!", 400); // check if all fields are filled

      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!validEmail) throw new CustomError("Invalid email!", 400); // check if email is valid

      const user = await UserModel.findOne({ email });
      if (!user)
        throw new CustomError(
          "Email not registered. Please register first!",
          404
        ); // check if email is registered

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) throw new CustomError("Invalid password.", 401); // check if password is valid

      const accessToken = generateAccessToken(user.id); // generate access token
      const refreshToken = generateRefreshToken(user.id); // generate refresh token

      const tokenOptions: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      }; // set cookie options

      res.cookie("accessToken", accessToken, {
        ...tokenOptions,
        maxAge: 1 * 60 * 1000, // 1 min
      }); // set access token cookie

      res.cookie("refreshToken", refreshToken, {
        ...tokenOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      }); // set refresh token cookie

      res.status(200).json({
        message: "Login success.",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          photoURL: user.photoURL,
        },
      }); // send response
    } catch (err: unknown) {
      logger.error(err); // logging error
      next(err); // pass error to error middleware
    }
  };

  /**
   * This method is used to logout a user.
   *
   * @param req
   * @param res
   *
   * @returns {void}
   * - Response with status code 200 and message.
   * - Delete the access token from cookie.
   *
   * @throws {CustomError} An error with status code 401 and error message.
   *
   * @example
   * router.post("/logout", authController.logoutUser);
   */
  logoutUser = (req: RequestWithCookies, res: Response): void => {
    const token = req.cookies.accessToken; // grab the access token from cookie

    if (!token) throw new CustomError("Unauthorized!", 401); // check if there's a token, if not, throw an error

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!); // verify the token

      if (typeof decoded === "object" && "userId" in decoded) {
        res.clearCookie("accessToken", { httpOnly: true });
        res.clearCookie("refreshToken", { httpOnly: true });
        res.status(200).json({ message: "You're logged out." });
        return;
      } // if token was valid, clear the access token and refresh token from cookie and send response
    } catch (err: unknown) {
      logger.error(err); // logging error

      res.clearCookie("accessToken", { httpOnly: true }); // clear the access token from cookie if the token is invalid
      res.clearCookie("refreshToken", { httpOnly: true }); // same thing for refresh token
      throw new CustomError("Invalid token!", 401); // throw invalid token error
    }
  };

  /**
   * This method is used to check the user authentication.
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns {Promise<void>}
   * - Response with status code 200 and user data.
   *
   * @throws {CustomError} An error with status code 404 and error message.
   *
   * @example
   * router.get("/me", authController.checkAuth);
   */
  checkAuth = async (
    req: RequestWithCookies,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.user as User; // destructure the user id from request

      if (!mongoose.isValidObjectId(id))
        throw new CustomError("Invalid user id!", 400); // check if the user id is valid

      const user = await UserModel.findById(id).select("-password"); // find the user
      if (!user) throw new CustomError("User not found!", 404); // check if the user exists

      res.status(200).json({
        message: "User is authenticated.",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          photoURL: user.photoURL,
        },
      }); // send user data as response
    } catch (err) {
      logger.error(err); // logging error
      next(err); // pass error to error middleware
    }
  };

  /**
   * This method is used to logout a user.
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns {Promise<void>}
   * - Response with status code 200 and message.
   * - Delete the access token from cookie.
   *
   * @throws {CustomError} An error with status code 401 and error message.
   *
   * @example
   * router.post("/refresh-token", authController.refreshToken);
   */
  refreshToken = async (
    req: RequestWithCookies,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { refreshToken } = req.cookies; // grab the refresh token from cookie
      if (!refreshToken) throw new CustomError("Refresh token not found!", 401); // check if there's a refresh token, if not, throw an error

      let decoded: DecodedToken;
      try {
        decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET!
        ) as DecodedToken; // verify the refresh token
      } catch (decodedErr: unknown) {
        res.clearCookie("refreshToken", { httpOnly: true }); // clear the refresh token from cookie
        throw new CustomError("Invalid refresh token!", 401); // throw invalid refresh token error
      }

      const user = await UserModel.findById(decoded.userId).select("-password"); // find user by id
      if (!user) {
        res.clearCookie("refreshToken", { httpOnly: true }); // clear the refresh token from cookie
        throw new CustomError("User not found!", 404); // check if the user exists
      }

      const accessToken = generateAccessToken(decoded.userId); // generate access token

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 60 * 1000, // 1 min
      }); // set access token cookie

      res.status(200).json({
        message: "Access token refreshed.",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          photoURL: user.photoURL,
        },
      }); // send response
    } catch (err: unknown) {
      logger.error(err); // logging error
      next(err); // pass error to error middleware
    }
  };
}

export const authController = new AuthController();
