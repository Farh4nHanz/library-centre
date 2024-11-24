import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import CustomError from "@/lib/customError";

/**
 * Middleware to handle errors occurring in the application.
 * 
 * @param err - The error object that was thrown.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 * 
 * This middleware function checks the type and properties of the error
 * and sends an appropriate HTTP response. If the error is a `CustomError`,
 * it sends the error's status code and message. If it is a MongoDB error
 * with a duplicate key code, it responds with a 409 status. For all other
 * errors, it sends a 500 status with a generic message.
 * The stack trace is included in the response when not in production.
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

  if (err.name === "MongoServerError" && err.code === 11000) {
    res.status(409).json({ message: "User already exists." });
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
