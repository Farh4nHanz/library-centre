import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import logger from "@/config/logger";

/** @types */
import { BookRequestBody } from "@/types";

/** @models */
import BookModel from "@/models/bookModel";

/** @libs */
import CustomError from "@/lib/customError";
import { bookSchema } from "@/lib/validator";
import { validatorErrorHandler } from "@/lib/validatorErrorHandler";

class BookController {
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

  addNewBook = async (
    req: Request<{}, {}, BookRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bookData = req.body; // grab the book data from request body
      bookSchema.parse(bookData); // validate the book data, if error it will throw an error

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
}

export const bookController = new BookController();
