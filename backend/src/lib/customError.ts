export default class CustomError extends Error {
  statusCode: number;

  /**
   * Constructor for CustomError class.
   *
   * @param {string} message Error message.
   * @param {number} statusCode HTTP status code.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
