import { Router } from "express";
import { userController } from "@/controllers/userController";
import { access, isAuth } from "@/middlewares/authMiddleware";
import { UserRole } from "@/constants";

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
  .get("/", isAuth, access([UserRole.admin]), userController.getAllUsers)

  /**
   * Route for request user profile.
   *
   * @private
   * @access [user, admin]
   * @method GET
   * @route "/api/v1/users/profile"
   */
  .get(
    "/profile",
    isAuth,
    access([UserRole.user, UserRole.admin]),
    userController.getUserProfile
  )

  /**
   * Route for deleting a user specified by id.
   *
   * @private
   * @access admin
   * @method DELETE
   * @route "/api/v1/users"
   */
  .delete(
    "/:id",
    isAuth,
    access([UserRole.admin]),
    userController.deleteUserById
  );

export default router;
