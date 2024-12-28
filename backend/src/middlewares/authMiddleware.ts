import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "@/config/logger";

/** @interfaces */
import { DecodedToken, RequestWithCookies, User } from "@/interfaces";

/** @models */
import UserModel from "@/models/userModel";

/** @constants */
import { UserRole } from "@/constants";

/** @utils */
import CustomError from "@/utils/customError";

/**
 * Checks if the request is authorized by verifying the access token stored in the cookie.
 * If the token is invalid or missing, it throws a 401 error.
 *
 * @throws {CustomError} - When the token is invalid or missing.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns {void} - Returns the next middleware function to allow user to access the route.
 *
 * This middleware will be used in authRouter to check if the user is authenticated.
 *
 * @example
 * router.get("/dashboard", isAuth, userController.getAllUsers);
 */
export const isAuth = async (
  req: RequestWithCookies,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { refreshToken } = req.cookies; // grab the refresh token from cookie
  if (!refreshToken) throw new CustomError("Unauthorized!", 403); // if the token is missing, throw an error

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as DecodedToken; // if there's a token, verify the token

    const user = await UserModel.findById(decoded.userId).select("-password"); // find the user by id

    if (!user) {
      res.clearCookie("accessToken", { httpOnly: true }); // clear the access token
      res.clearCookie("refreshToken", { httpOnly: true }); // clear the refresh token
      throw new CustomError("User not found!", 404);
    } // if the user doesn't exist, return an error as a response

    req.user = user; // store the user in the request object
    next(); // allow user to access private route
  } catch (err: unknown) {
    logger.error(err); // logging the error

    res.clearCookie("accessToken", { httpOnly: true }); // clear the access token from the cookie
    res.clearCookie("refreshToken", { httpOnly: true }); // clear the refresh token from the cookie
    throw new CustomError("Invalid token!", 401); // if the token is invalid, throw an error
  }
};

/**
 * Checks if the request is already authenticated by verifying the access token stored in the cookie.
 * If the token is valid, it returns a 409 response with the decoded user data.
 * If the token is invalid or missing, it calls the next middleware function in the stack.
 *
 * @throws {CustomError} - When the token is invalid.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns {void} - Returns the next middleware to allow user to access the route.
 *
 * This middleware will be used in authRouter to check if the user is already authenticated.
 *
 * @example
 * router.post("/login", stillAuth, authController.loginUser);
 */
export const stillAuth = async (
  req: RequestWithCookies,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.accessToken; // grab the access token from cookie

  if (!token) return next(); // if there's no token, allow user to access the route

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as DecodedToken; // if there's a token, verify the token

    const user = await UserModel.findById(decoded.userId).select("-password"); // search the existing user in database with the decoded user id

    if (!user) {
      res.clearCookie("accessToken", { httpOnly: true }); // clear the access token
      res.clearCookie("refreshToken", { httpOnly: true }); // clear the refresh token
      throw new CustomError("User not found!", 404);
    } // if the user doesn't exist, return an error as a response

    req.user = user; // set the user to the request object
    res.status(409).json({ message: "Already authenticated.", user: user }); // send a response
  } catch (err: unknown) {
    logger.error(err); // logging the error

    res.clearCookie("accessToken", { httpOnly: true }); // clear the access token
    res.clearCookie("refreshToken", { httpOnly: true }); // clear the refresh token
    throw new CustomError("Invalid token!", 401); // if the token is invalid, throw an error
  }
};

/**
 * Access control middleware.
 * Checks if the user has the required role to access the route.
 *
 * @param {UserRole[]} roles - An array of allowed user roles.
 *
 * @returns {(req: RequestWithCookies, res: Response, next: NextFunction) => void} - The middleware function.
 *
 * @example
 * router.get("/users", access([UserRole.admin]), userController.getAllUsers);
 */
export const access = (roles: UserRole[]) => {
  return (req: RequestWithCookies, res: Response, next: NextFunction): void => {
    const user = req.user as User;

    if (!roles.includes(user?.role)) {
      throw new CustomError("Access denied!", 403);
    }

    next();
  };
};
