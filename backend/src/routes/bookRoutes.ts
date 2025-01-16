import { Router } from "express";
import { UserRole } from "@/constants";
import { bookController } from "@/controllers/bookController";
import { access, isAuth } from "@/middlewares/authMiddleware";
import upload from "@/lib/upload";

const router = Router();

router
  /**
   * Route for fetching all books.
   *
   * @public
   * @access all
   * @method GET
   * @route "/api/v1/books"
   *
   * This endpoint is used to fetch all books data.
   */
  .get("/", bookController.getAllBooks)

  /**
   * Route for fetching a book.
   *
   * @public
   * @access all
   * @method GET
   * @route "/api/v1/books/:id"
   *
   * This endpoint is used to fetch book data by it's id.
   */
  .get("/:id", bookController.getBookById);

router
  /**
   * Route for add a new book.
   *
   * @private
   * @access admin
   * @method POST
   * @route "/api/v1/books"
   *
   * This endpoint is used to add new book.
   */
  .post(
    "/",
    isAuth,
    access([UserRole.admin]),
    upload.single("cover"),
    bookController.addNewBook
  );

router
  /**
   * Route for update a new book.
   *
   * @private
   * @access admin
   * @method PUT
   * @route "/api/v1/books/:id"
   *
   * This endpoint is used to update a book.
   */
  .put(
    "/:id",
    isAuth,
    access([UserRole.admin]),
    upload.single("cover"),
    bookController.updateBookById
  )
  /**
   * Route for rate a book.
   *
   * @private
   * @access all
   * @method PUT
   * @route "/api/v1/books/:id/rate"
   *
   * This endpoint is used to rate a book by it's id.
   */
  .put("/:id/rate", isAuth, bookController.rateBookById);

router
  /**
   * Route for delete all books.
   *
   * @private
   * @access admin
   * @method DELETE
   * @route "/api/v1/books"
   *
   * This endpoint is used to delete all books.
   */
  .delete("/", isAuth, access([UserRole.admin]), bookController.deleteAllBooks)

  /**
   * Route for delete a book.
   *
   * @private
   * @access admin
   * @method DELETE
   * @route "/api/v1/books/:id"
   *
   * This endpoint is used to delete book by it's id.
   */
  .delete(
    "/:id",
    isAuth,
    access([UserRole.admin]),
    bookController.deleteBookById
  );

export default router;
