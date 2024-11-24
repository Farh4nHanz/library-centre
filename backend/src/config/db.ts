import mongoose from "mongoose";
import logger from "@/config/logger";

/**
 * Establishes a connection to the MongoDB database.
 * The connection string is retrieved from the `MONGO_URI` environment variable.
 * If the connection fails, an error is logged and the Node.js process is terminated.
 * @returns {Promise<void>} Resolves if the connection is successful, rejects if not.
 */
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    logger.info(`Database connected: ${mongoose.connection.host}`);
  } catch (err: unknown) {
    logger.error(err);
    process.exit(1);
  }
};

export default connectDB;
