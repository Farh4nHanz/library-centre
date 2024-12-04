import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import logger from "@/config/logger";

/** @types */
import { type BookRequestBody, type RequestParams } from "@/types";

/** @models */
import BookModel from "@/models/bookModel";

/** @libs */
import CustomError from "@/lib/customError";
import { bookSchema } from "@/lib/validator";
import { validatorErrorHandler } from "@/lib/validatorErrorHandler";

/**
 * Class based controller for book crud operations and more.
 *
 * @class BookController
 * @classdesc Handles book related operations.
 * Utilizes {@link BookModel} for database interactions.
 */
class BookController {
  /**
   * Fetches all books from the database.
   *
   * @method getAllBooks
   * @memberof BookController
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The next middleware function in the stack.
   *
   * This method retrieves all book records from the database
   * and sends them in the response. If an error occurs, it logs
   * the error and passes it to the error-handling middleware.
   *
   * @returns {Promise<void>} Response with status code 200 and array of books.
   *
   * @example
   * router.get("/", bookController.getAllBooks);
   */
  getAllBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const books = await BookModel.find(); // get all books from database
      res.status(200).json({ books: books }); // send the books data to client
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
    }
  };

  /**
   * Fetches a book by its ID from the database.
   *
   * @method getBookById
   * @memberof BookController
   *
   * @param {Request<RequestParams>} req - The Express request object with request parameters.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function.
   *
   * @throws {CustomError} If the book ID is invalid or not found.
   *
   * @returns {Promise<void>} Response with status code 200 and the book document.
   *
   * @example
   * router.get("/:id", bookController.getBookById);
   */
  getBookById = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params; // grab the book id from request params

      if (!mongoose.isValidObjectId(id))
        throw new CustomError("Invalid book id!", 400); // check if the book id is valid

      const book = await BookModel.findById(id); // find the book
      if (!book) throw new CustomError("Book not found!", 404); // check if the book exists

      res.status(200).json({ book: book }); // send the book data to client
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
    }
  };

  /**
   * Adds a new book to the database.
   *
   * @method addNewBook
   * @memberof bookController
   *
   * @param {Request<{}, {}, BookRequestBody>} req - The Express request object with request body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function.
   *
   * @throws {CustomError} If the book title already exists in the database.
   * @throws {ZodError} If the request body does not match the {@link BookRequestBody} schema.
   *
   * @returns {Promise<void>} Response with status code 201 and the new book document.
   *
   * @example
   * router.post("/", bookController.addNewBook);
   */
  addNewBook = async (
    req: Request<{}, {}, BookRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bookData = req.body; // grab the book data from request body
      bookSchema.parse(bookData); // validate the book data, if error it will throw an error

      const bookExists = await BookModel.findOne({ title: bookData.title });
      if (bookExists) throw new CustomError("Book already exists!", 400); // if the book is already exist, throw an error

      const newBook = new BookModel(bookData); // store the book data in database
      await newBook.save();

      res.status(201).json({
        message: "New book added successfully!",
        book: newBook,
      }); // send the book data to client
    } catch (err) {
      if (err instanceof ZodError) {
        validatorErrorHandler(err)(req, res, next); // if the error is coming from validation, then return the validatorError function
      } else {
        // else return the error in this block
        logger.error(err); // logging error
        next(err); // passing error to error middleware
      }
    }
  };

  /**
   * Deletes a book by its ID from the database.
   *
   * @method deleteBookById
   * @memberof BookController
   *
   * @param {Request<RequestParams>} req - The Express request object with request parameters.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function.
   *
   * @throws {CustomError} If the book ID is invalid or not found.
   *
   * @returns {Promise<void>} Response with status code 200 and a message "One book has been deleted!".
   *
   * @example
   * router.delete("/:id", bookController.deleteBookById);
   */
  deleteBookById = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params; // destructure the book id from parameter

      if (!mongoose.isValidObjectId(id))
        throw new CustomError("Invalid book id!", 400); // if the id is not valid, throw an error

      const deletedBook = await BookModel.findByIdAndDelete(id);
      if (!deletedBook) throw new CustomError("Book not found!", 404); // if the book is not exist, throw an error

      res.status(200).json({ message: "One book has been deleted!" }); // return a response message
    } catch (err) {
      logger.error(err); // logging the error
      next(err); // passing the error to next middleware
    }
  };
}

export const bookController = new BookController();
