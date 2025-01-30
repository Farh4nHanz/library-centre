import { RequestHandler } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";
import logger from "@/config/logger";
import BookGenreModel from "@/models/bookGenreModel";
import type { BookGenreRequestBody, RequestParams } from "@/types";
import CustomError from "@/utils/customError";

/**
 * Class based controller for book genre crud operations.
 *
 * @class BookGenreController
 * @classdesc Handles book genre related operations.
 * Utilizes {@link BookGenreModel} for database interactions.
 */
class BookGenreController {
  /**
   * Retrieves all book genres from the database.
   *
   * @memberof {@link BookGenreController}
   * @name {@link getAllBookGenres}
   *
   * @returns {Promise<void>} Response with status code 200 and array of book genres.
   *
   * @example
   * router.get("/genres", bookGenreController.getAllBookGenres);
   */
  getAllBookGenres: RequestHandler = async (_req, res, next): Promise<void> => {
    try {
      const bookGenres = await BookGenreModel.find(); // get all book genres from database
      res.status(200).json({ genres: bookGenres }); // send the book genres data as response
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing the error to next middleware
    }
  };

  /**
   * Retrieve a book genre by it's ID from the database.
   *
   * @memberof {@link BookGenreController}
   * @name {@link getBookGenreById}
   *
   * @throws Throws {@link CustomError} If the book genre ID is invalid or not found.
   *
   * @returns {Promise<void>} Response with status code 200 and the book genre data.
   *
   * @example
   * router.get("/genres/:id", bookGenreController.getBookGenreById);
   */
  getBookGenreById: RequestHandler<RequestParams> = async (
    req,
    res,
    next
  ): Promise<void> => {
    try {
      const { id } = req.params; // grab the book genre id from request params

      if (!mongoose.isValidObjectId(id))
        throw new CustomError("Invalid book genre id!", 400); // if the book genre id is not valid, then throw an error

      const bookGenre = await BookGenreModel.findById(id); // find the book genre
      if (!bookGenre) throw new CustomError("Book genre not found!", 404); // if the book genre doesn't exist, then throw an error

      res.status(200).json({ genre: bookGenre }); // send the book genre data as response
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing the error to next middleware
    }
  };

  /**
   * Adds a new book genre to the database.
   *
   * @memberof {@link bookGenreController}
   * @name {@link addNewBookGenre}
   *
   * @throws Throws {@link CustomError} If the book genre already exists in the database.
   * @throws Throws {@link ZodError} If the request body does not match the {@link BookRequestBody} schema.
   *
   * @returns {Promise<void>} Response with status code 201, message and the new book genre.
   *
   * @example
   * router.post("/genres", bookGenreController.addNewBookGenre);
   */
  addNewBookGenre: RequestHandler<{}, {}, BookGenreRequestBody> = async (
    req,
    res,
    next
  ): Promise<void> => {
    try {
      const { name } = req.body; // destructure the request body

      const newBookGenre = new BookGenreModel({ name }); // create a new book genre and save it to database
      await newBookGenre.save();

      res.status(201).json({
        message: `Successfully added ${newBookGenre.name} as a new book genre.`,
        genre: newBookGenre,
      }); // send a success response
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing the error to next middleware
    }
  };

  /**
   * Updates a book genre by its ID in the database.
   *
   * @memberof {@link BookGenreController}
   * @name {@link updateBookGenreById}
   *
   * @throws Throws {@link CustomError} If the book genre ID is invalid or not found.
   *
   * @returns {Promise<void>} Response with status code 200, message and the updated book genre.
   *
   * @example
   * router.put("/genres/:id", bookGenreController.updateBookGenreById);
   */
  updateBookGenreById: RequestHandler<RequestParams, {}, BookGenreRequestBody> =
    async (req, res, next): Promise<void> => {
      try {
        const { id } = req.params; // grab the book genre id from request params

        if (!mongoose.isValidObjectId(id))
          throw new CustomError("Invalid book genre id!", 400); // if the book genre id is not valid, then throw an error

        const updatedBookGenre = await BookGenreModel.findOneAndUpdate(
          { _id: id },
          { $set: req.body },
          { new: true }
        );

        if (!updatedBookGenre)
          throw new CustomError("Book genre not found!", 404); // if the book genre doesn't exist, then throw an error

        res.status(200).json({
          message: `Book genre called ${updatedBookGenre.name} has been updated!`,
          updatedGenre: updatedBookGenre,
        }); // send a success response
      } catch (err) {
        logger.error(err); // logging error
        next(err); // passing the error to next middleware
      }
    };

  /**
   * Delete a book genre by its ID from the database.
   *
   * @memberof {@link BookGenreController}
   * @name {@link deleteBookGenreById}
   *
   * @throws Throws {@link CustomError} If the book genre ID is invalid or not found.
   *
   * @returns {Promise<void>} Response with status code 200 and a message.
   *
   * @example
   * router.delete("/genres/:id", bookGenreController.deleteBookGenreById);
   */
  deleteBookGenreById: RequestHandler<RequestParams> = async (
    req,
    res,
    next
  ): Promise<void> => {
    try {
      const { id } = req.params; // grab the book genre id from request params

      if (!mongoose.isValidObjectId(id))
        throw new CustomError("Invalid book genre id!", 400); // if the book genre id is not valid, then throw an error

      const deletedBookGenre = await BookGenreModel.findByIdAndDelete(id); // find the book genre and delete it from database
      if (!deletedBookGenre)
        throw new CustomError("Book genre not found!", 404); // if the book genre doesn't exist, then throw an error

      res.status(200).json({
        message: `Book genre called ${deletedBookGenre.name} has been deleted!`,
      }); // send a success response
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing the error to next middleware
    }
  };

  /**
   * Deletes all book genres from the database.
   *
   * @memberof BookController
   * @name deleteAllBooks
   *
   * @throws Throws {@link CustomError} If there are no book genres in the database.
   *
   * @returns {Promise<void>} Response with status code 200 and a message.
   *
   * @example
   * router.delete("/genres", bookGenreController.deleteAllBookGenres);
   */
  deleteAllBookGenres: RequestHandler = async (
    _req,
    res,
    next
  ): Promise<void> => {
    try {
      const bookGenres = await BookGenreModel.find(); // get all book genres from database
      if (bookGenres.length < 1)
        throw new CustomError("There are no book genres data to delete!", 404); // if there's no book genres to delete, then throw an error

      await BookGenreModel.deleteMany(); // delete all book genres from database

      res.status(200).json({ message: "All book genres have been deleted!" }); // send a success response
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing the error to next middleware
    }
  };
}

export const bookGenreController = new BookGenreController();
