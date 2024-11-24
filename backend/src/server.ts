import logger from "@/config/logger";

import dotenv from "dotenv";
dotenv.config();

import createApp from "@/createApp";
const app = createApp();

/**
 * @errorHandler
 * Error handlers should be defined below this line.
 * All errors coming from server could be handled by errorHandler middleware.
 * If there's any unkown resource tried to be accessed, notFound middleware will be called.
 */
import { errorHandler, notFound } from "@/middlewares/errorMiddleware";

app.use(notFound);
app.use(errorHandler);

/**
 * @server
 * Define port and start the server by listening to it.
 */
import connectDB from "@/config/db";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  logger.info(`Server running on port ${PORT}`);
});
