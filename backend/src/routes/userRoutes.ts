import { Router } from "express";
import { userController } from "@/controllers/userController";
import { isAuth } from "@/middlewares/authMiddleware";

const router = Router();

router
  /**
   * Route for fetching all users.
   *
   * @private
   * @access admin
   * @method GET
   * @route "/api/v1/users"
   */
  .get("/", isAuth, userController.getAllUsers)

  /**
   * Route for request user profile.
   *
   * @private
   * @access [user, admin]
   * @method GET
   * @route "/api/v1/users/profile"
   */
  .get("/profile", isAuth, userController.getUserProfile)

  /**
   * Route for deleting a user specified by id.
   *
   * @private
   * @access admin
   * @method DELETE
   * @route "/api/v1/users"
   */
  .delete("/:id", isAuth, userController.deleteUserById);

export default router;
