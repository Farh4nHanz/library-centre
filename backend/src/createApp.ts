import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { pinoHttp } from "pino-http";
import logger from "@/config/logger";
import createRoutes from "@/routes";

/**
 * Creates an express app with middlewares
 *
 * @returns {e.Express} The created express app
 */
const createApp = (): e.Express => {
  const app = e();

  // middlewares
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );
  app.use(e.json());
  app.use(e.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(pinoHttp({ logger }));
  
  // define routes
  createRoutes(app);

  return app;
};

export default createApp;
