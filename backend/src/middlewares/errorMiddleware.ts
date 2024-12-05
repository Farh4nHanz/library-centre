import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { ZodError } from "zod";
import CustomError from "@/utils/customError";

/**
 * Error handler middleware to handle errors that have been passed to the
 * next function from previous middleware.
 *
 * @param {Error} err - The error object
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 */
export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: err.issues.map((issue) => {
        return {
          path: issue.path.join(""),
          message: issue.message,
        };
      }),
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
    return;
  }

  if (err instanceof MulterError && err.code === "LIMIT_FILE_SIZE") {
    res.status(413).json({
      error: "Maximum file size is 2MB!",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
    return;
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    res.status(409).json({
      message: "Some value already exists in record.",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
    return;
  }

  res.status(500).json({
    message: "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

/**
 * Middleware to handle requests to unknown endpoints.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 *
 * This middleware function creates a `CustomError` with a 404 status code,
 * indicating that the requested resource was not found. The error message
 * includes the original request URL. It then passes this error to the next
 * middleware in the stack for further handling.
 */
export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new CustomError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};
