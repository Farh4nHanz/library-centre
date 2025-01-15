import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import logger from "@/config/logger";

/** @types */
import { type BookRequestBody, type RequestParams } from "@/types";

/** @models */
import BookModel from "@/models/bookModel";

/** @services */
import { s3Service } from "@/services/s3Service";

/** @libs */
import { bookSchema } from "@/lib/validator";

/** @utils */
import CustomError from "@/utils/customError";

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
      const books = await BookModel.find().sort({ createdAt: -1 }); // get all books from database
      const formattedBooks = books.map((book) => {
        const averageRating =
          book.rating.length > 0
            ? Number(
                (
                  book.rating.reduce((a, b) => a + b, 0) / book.rating.length
                ).toFixed(1)
              )
            : 0; // calculate the average rating

        return {
          ...book.toObject({ virtuals: true }), // convert the book document to object
          rating: averageRating, // convert the average rating from string to number
          allRatings: book.rating, // get all ratings
          totalRatings: book.rating.length, // get the total number of ratings
        };
      }); // map the books to calculate the rating of each book

      res.status(200).json({ books: formattedBooks }); // send the books data to client
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

      const averageRating =
        book.rating.length > 0
          ? Number(
              (
                book.rating.reduce((a, b) => a + b, 0) / book.rating.length
              ).toFixed(1)
            )
          : 0; // calculate the average rating

      res.status(200).json({
        book: {
          ...book.toObject({ virtuals: true }),
          rating: averageRating,
          allRatings: book.rating,
          totalRatings: book.rating.length,
        },
      }); // send the book data to client
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
      const parsedBookData = bookSchema.parse({
        ...bookData,
        isbn: bookData.isbn ? String(bookData.isbn) : null,
        pages: String(bookData.pages),
        totalCopies: String(bookData.totalCopies),
      }); // validate the book data, if error it will throw an error

      const coverFile = req.file; // grab the cover file from request
      if (!coverFile) throw new CustomError("Please upload book's cover!", 400); // if the cover file is not uploaded, throw an error

      const bookExists = await BookModel.findOne({
        title: { $regex: new RegExp(parsedBookData.title, "i") },
      });
      if (bookExists) throw new CustomError("Book already exists!", 409); // if the book is already exist, throw an error

      const key = `uploads/${Date.now()}-${coverFile.originalname}`; // generate a unique key for the cover file
      const coverURL = await s3Service.uploadFile(
        key,
        coverFile.buffer,
        coverFile.mimetype
      ); // upload the cover file to s3

      const newBook = new BookModel({
        ...parsedBookData,
        coverURL,
        availableCopies: parsedBookData.totalCopies,
      }); // store the book data in database
      await newBook.save();

      res.status(201).json({
        message: "New book added successfully!",
        book: newBook,
      }); // send the book data to client
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
    }
  };

  /**
   * Updates a book by its ID in the database.
   *
   * @method updateBookById
   * @memberof BookController
   *
   * @param {Request<RequestParams, {}, BookRequestBody>} req - The Express request object with request parameters and request body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function.
   *
   * @throws {CustomError} If the book ID is invalid or not found.
   * @throws {MulterError} If there is an error in uploading the cover file.
   *
   * @returns {Promise<void>} Response with status code 200 and a message "Book has been updated!" and the updated book document.
   *
   * @example
   * router.put("/:id", bookController.updateBookById);
   */
  updateBookById = async (
    req: Request<RequestParams, {}, BookRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params; // destructure the book id from request params

      if (!mongoose.isValidObjectId(id))
        throw new CustomError("Invalid book id!", 400); // check if the book id is valid

      const updateData: Partial<BookRequestBody> = { ...req.body }; // grab the book data from request body
      if (req.file) {
        updateData.cover = req.file;
      } // if the cover file is uploaded, then update the cover file

      const updatedBook = await BookModel.findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        { new: true }
      ); // update the book

      if (!updatedBook) throw new CustomError("Book not found!", 404); // if the book is not found, throw an error

      res.status(200).json({
        message: "Book has been updated!",
        updatedBook: updatedBook,
      }); // send the updated book data to client
    } catch (err) {
      logger.error(err); // logging error
      next(err); // passing error to error middleware
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

      const key = deletedBook.coverURL.split(".com/")[1]; // extract the key from the cover url
      await s3Service.deleteFile(key); // delete the cover file from s3 bucket

      res.status(200).json({ message: "One book has been deleted!" }); // return a response message
    } catch (err) {
      logger.error(err); // logging the error
      next(err); // passing the error to next middleware
    }
  };

  /**
   * Deletes all books from the database.
   *
   * @method deleteAllBooks
   * @memberof BookController
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function.
   *
   * @throws {CustomError} If there are no books in the database.
   *
   * @returns {Promise<void>} Response with status code 200 and a message "All books successfully deleted!".
   *
   * @example
   * router.delete("/", bookController.deleteAllBooks);
   */
  deleteAllBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const books = await BookModel.find(); // find to count the number of books in database
      if (books.length < 1)
        throw new CustomError("There are no books data to delete!", 404); // if there are no books in database, throw an error

      await BookModel.deleteMany(); // delete all books from database

      const keys = books.map((book) => book.coverURL.split(".com/")[1]); // extract the keys from each cover url books
      await Promise.all(keys.map((key) => s3Service.deleteFile(key))); // delete all cover files from s3 bucket

      res.status(200).json({ message: "All books successfully deleted!" });
    } catch (err) {
      logger.error(err); // logging the error
      next(err); // passing the error to next middleware
    }
  };
}

export const bookController = new BookController();
