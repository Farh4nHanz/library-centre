import { RequestHandler } from "express";
import mongoose from "mongoose";
import logger from "@/config/logger";

/** @interfaces */
import { RequestWithUser, User } from "@/interfaces";

/** @types */
import { type RequestParams } from "@/types";

/** @models */
import UserModel from "@/models/userModel";

/** @utils */
import CustomError from "@/utils/customError";

/**
 * Class based controller for user crud operations and more.
 *
 * @class UserController
 * @classdesc Handles user related operations.
 * Utilizes {@link UserModel} for database interactions.
 */
class UserController {
  /**
   * Fetches and returns all users from the database.
   *
   * @method getAllUsers
   * @memberof UserController
   *
   * @throws {Error} - Passes the error to the next middleware if an error occurs.
   *
   * @returns {Promise<void>} Response with 200 status code and users array.
   *
   * @example
   * router.get("/", userController.getAllUsers);
   */
  getAllUsers: RequestHandler = async (_req, res, next): Promise<void> => {
    try {
      const users = await UserModel.find()
        .select("-password")
        .sort({ createdAt: -1 }); // get all users from database
      res.status(200).json({ users: users }); // send the users data to client
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
    }
  };

  /**
   * Fetches and returns a user from the database by user id.
   *
   * @method getUserById
   * @memberof UserController
   *
   * @throws {CustomError} - If the user id is not valid or the user doesn't exist.
   *
   * @returns {Promise<void>} Response with status code 200 and user data.
   *
   * @example
   * router.get("/:id", userController.getUserById);
   */
  getUserById: RequestHandler<RequestParams> = async (
    req,
    res,
    next
  ): Promise<void> => {
    try {
      const { id } = req.params; // grab the user id from request params

      if (!mongoose.isValidObjectId(id))
        throw new CustomError("Invalid user id!", 400); // if the user id is not valid, then throw an error

      const user = await UserModel.findById(id).select("-password"); // find the user
      if (!user) throw new CustomError("User not found!", 404); // check if the user exists

      res.status(200).json({ user: user }); // send the user data to client
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
    }
  };

  /**
   * This method is used to fetch the profile of the logged-in user.
   *
   * @method getUserProfile
   * @memberof UserController
   *
   * @throws {CustomError} An error with status code 400 or 404 and error message.
   *
   * @returns {Promise<void>} Response with status code 200 and user profile data.
   *
   * @example
   * router.get("/profile", userController.getUserProfile);
   */
  getUserProfile: RequestHandler = async (req, res, next): Promise<void> => {
    try {
      const { id } = (req as RequestWithUser).user as User; // destructure the user id from request

      if (!mongoose.isValidObjectId(id))
        throw new CustomError("Invalid user id!", 400); // check if the user id is valid

      const user = await UserModel.findById(id).select("-password"); // find the user
      if (!user) throw new CustomError("User not found!", 404); // check if the user exists

      res.status(200).json({ profile: user }); // send the user data
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
    }
  };

  /**
   * This method is used to delete user by id.
   *
   * @method deleteUserById
   * @memberof UserController
   *
   * @throws {CustomError} An error with status code 400 or 404 and error message.
   *
   * @returns {Promise<void>} Response with status code 200 and deleted message.
   *
   * @example
   * router.delete("/:id", userController.deleteUserById);
   */
  deleteUserById: RequestHandler<RequestParams> = async (
    req,
    res,
    next
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
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
    }
  };
}

export const userController = new UserController();
