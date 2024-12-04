import { Router } from "express";
import { UserRole } from "@/constants";
import { bookController } from "@/controllers/bookController";
import { access, isAuth } from "@/middlewares/authMiddleware";

const router = Router();

router
  /**
   * Route for fetching all books.
   *
   * @public
   * @access [user, admin]
   * @method GET
   * @route "/api/v1/books"
   *
   * This endpoint is used to fetch all books data.
   */
  .get("/", bookController.getAllBooks)

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
  .post("/", isAuth, access([UserRole.admin]), bookController.addNewBook)

  /**
   * Route for delete a book.
   *
   * @private
   * @access admin
   * @method DELETE
   * @route "/api/v1/books"
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
