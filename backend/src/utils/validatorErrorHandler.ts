import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import logger from "@/config/logger";

/**
 * Middleware to handle validation errors from Zod.
 *
 * @param err - The ZodError object containing validation issues.
 * 
 * @returns A middleware function that processes the error and sends a 400 response
 * with details about the validation issues.
 *
 * The response includes the path and message of each issue, and the stack trace
 * if not in production. The error is logged using the application's logger.
 */
export const validatorErrorHandler = (err: ZodError) => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.error(err);

    return res.status(400).json({
      error: err.issues.map((issue) => {
        return {
          path: issue.path.join(""),
          message: issue.message,
        };
      }),
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
};
