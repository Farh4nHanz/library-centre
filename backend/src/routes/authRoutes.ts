import { Router } from "express";
import { authController } from "@/controllers/authController";
import { stillAuth } from "@/middlewares/authMiddleware";

const router = Router();

router
  /**
   * Route for checking user authentication.
   *
   * @public
   * @access all
   * @method GET
   * @route "/api/v1/auth/me"
   *
   * This endpoint is used to check the user authentication.
   * It will send a user data.
   */
  .get("/me", authController.checkAuth);

router
  /**
   * Route for registering new user.
   *
   * @public
   * @access all
   * @method POST
   * @route "/api/v1/auth/register"
   *
   * This endpoint allows new users to register by providing a username, password, and email.
   */
  .post("/register", stillAuth, authController.registerUser)

  /**
   * Route for logging in a user.
   *
   * @public
   * @access all
   * @method POST
   * @route "/api/v1/auth/login"
   *
   * This endpoint allows registered users to log in by providing an email, and password.
   */
  .post("/login", stillAuth, authController.loginUser)

  /**
   * Route for logged out a user.
   *
   * @public
   * @access all
   * @method POST
   * @route "/api/v1/auth/logout"
   *
   * This endpoint allows an authenticated users to log out.
   * It will delete the access token from the cookie.
   */
  .post("/logout", authController.logoutUser)

  /**
   * Route for logged out a user.
   *
   * @public
   * @access all
   * @method POST
   * @route "/api/v1/auth/refresh-token"
   *
   * This endpoint is used to refresh the access token.
   * It will generate new access token if the refresh token is valid.
   */
  .post("/refresh-token", authController.refreshToken);

export default router;
