import { Router } from "express";
import { UserRole } from "@/constants";
import { bookController } from "@/controllers/bookController";
import { access, isAuth } from "@/middlewares/authMiddleware";
import upload from "@/lib/upload";
import { bookGenreController } from "@/controllers/bookGenreController";

const router = Router();

/**
 * @method GET
 * Put all book routes with @method GET here
 */
router
  /**
   * Route for fetching all books.
   *
   * @public
   * @access all
   * @route "/api/v1/books"
   *
   * This endpoint is used to fetch all books data.
   */
  .get("/", bookController.getAllBooks)

  /**
   * Route for fetching all book genres.
   *
   * @public
   * @access all
   * @route "/api/v1/books/genres"
   *
   * This endpoint is used to fetch all book genres.
   */
  .get("/genres", bookGenreController.getAllBookGenres)

  /**
   * Route for fetching a book genre.
   *
   * @public
   * @access all
   * @route "/api/v1/books/genres/:id"
   *
   * This endpoint is used to fetch book genre by it's id.
   */
  .get("/genres/:id", bookGenreController.getBookGenreById)

  /**
   * Route for fetching a book.
   *
   * @public
   * @access all
   * @route "/api/v1/books/:id"
   *
   * This endpoint is used to fetch book data by it's id.
   */
  .get("/:id", bookController.getBookById);

/**
 * @method POST
 * Put all book routes with @method POST here
 * */
router
  /**
   * Route for add a new book.
   *
   * @private
   * @access admin
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
  )

  /**
   * Route for add a new book genre.
   *
   * @private
   * @access admin
   * @route "/api/v1/books/genres"
   *
   * This endpoint is used to add new book genre.
   */
  .post(
    "/genres",
    isAuth,
    access([UserRole.admin]),
    bookGenreController.addNewBookGenre
  );

/**
 * @method PUT
 * Put all book routes with @method PUT here
 */
router
  /**
   * Route for update a book genre.
   *
   * @private
   * @access admin
   * @route "/api/v1/books/genres/:id"
   *
   * This endpoint is used to update book genre by it's id.
   */
  .put(
    "/genres/:id",
    isAuth,
    access([UserRole.admin]),
    bookGenreController.updateBookGenreById
  )

  /**
   * Route for update a book.
   *
   * @private
   * @access admin
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
   * @route "/api/v1/books/:id/rate"
   *
   * This endpoint is used to rate a book by it's id.
   */
  .put("/:id/rate", isAuth, bookController.rateBookById);

/**
 * @method DELETE
 * Put all book routes with @method DELETE here
 */
router
  /**
   * Route for delete all books.
   *
   * @private
   * @access admin
   * @route "/api/v1/books"
   *
   * This endpoint is used to delete all books.
   */
  .delete("/", isAuth, access([UserRole.admin]), bookController.deleteAllBooks)

  /**
   * Route for delete a book genre.
   *
   * @private
   * @access admin
   * @route "/api/v1/books/genres"
   *
   * This endpoint is used to delete all book genres.
   */
  .delete(
    "/genres",
    isAuth,
    access([UserRole.admin]),
    bookGenreController.deleteAllBookGenres
  )

  /**
   * Route for delete a book genre.
   *
   * @private
   * @access admin
   * @route "/api/v1/books/genres/:id"
   *
   * This endpoint is used to delete book genre by it's id.
   */
  .delete(
    "/genres/:id",
    isAuth,
    access([UserRole.admin]),
    bookGenreController.deleteAllBookGenres
  )

  /**
   * Route for delete a book.
   *
   * @private
   * @access admin
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
