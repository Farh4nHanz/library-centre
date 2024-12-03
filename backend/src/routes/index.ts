import e from "express";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import bookRoutes from "@/routes/bookRoutes";

/**
 * Configures and attaches all application routes to the provided Express app.
 *
 * @param app - The Express app on which to configure routes.
 *
 * This function sets up the routing for the application by attaching various
 * route handlers to specific paths. It organizes the different routes and
 * their corresponding handlers for the app, ensuring that each endpoint is
 * appropriately mapped to its handler.
 */
const createRoutes = (app: e.Express): void => {
  app.use("/api/v1/auth", authRoutes); // auth routes
  app.use("/api/v1/users", userRoutes); // user routes
  app.use("/api/v1/books", bookRoutes); // book routes
};

export default createRoutes;
