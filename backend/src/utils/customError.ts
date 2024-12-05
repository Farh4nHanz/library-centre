/**
 * Custom error class to create custom errors with HTTP status code.
 *
 * @class
 * @extends {Error}
 */
export default class CustomError extends Error {
  /**
   * HTTP status code.
   *
   * @memberof CustomError
   * @type {number}
   */
  statusCode: number;

  /**
   * Creates an instance of CustomError.
   *
   * @memberof CustomError
   * @param {string} message Error message.
   * @param {number} statusCode HTTP status code.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
