import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import logger from "@/config/logger";

/** @interfaces */
import { RequestWithCookies, User } from "@/interfaces";

/** @models */
import UserModel from "@/models/userModel";

/** @libs */
import CustomError from "@/lib/customError";
import { RequestParams } from "@/types";

class UserController {
  /**
   * This method is used to fetch all users from database.
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns {Promise<void>} Response with status code 200 and users data.
   *
   * @throws {Error} An error with status code 500 and error message from error handler middleware.
   *
   * @example
   * router.get("/", userController.getAllUser);
   */
  getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await UserModel.find(); // get all users from database

      res.status(200).json({ users: users }); // send the users data to client
    } catch (err: unknown) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
    }
  };

  /**
   * This method is used to fetch all users from database.
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns {Promise<void>} Response with status code 200 and users data.
   *
   * @throws {Error} An error with status code 404 and error message.
   *
   * @example
   * router.get("/profile", userController.getUserProfile);
   */
  getUserProfile = async (
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
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          photoURL: user.photoURL,
        },
      }); // send the user data
    } catch (err: unknown) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
    }
  };

  /**
   * This method is used to delete user by id.
   *
   * @param req
   * @param res
   * @param next
   *
   * @returns {void} Response with status code 200 and deleted message.
   *
   * @throws {CustomError} An error with status code 400, 404 and error message.
   *
   * @example
   * router.delete("/:id", userController.deleteUserById);
   */
  deleteUserById = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params; // destructure the request params

      if (!mongoose.isValidObjectId(id))
        throw new CustomError("Invalid user id!", 400); // check if the user id is valid

      const user = await UserModel.findByIdAndDelete(id); // find the user

      if (!user) throw new CustomError("User not found!", 404); // check if the user exist or not

      res.status(200).json({
        message: `Successfully deleted user named ${user.username}.`,
      }); // send success message
    } catch (err: unknown) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
    }
  };
}

export const userController = new UserController();
