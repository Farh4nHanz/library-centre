import path from "path";
import pino from "pino";

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: {
        destination: path.resolve(__dirname, "../../logs/app.log"),
        mkdir: true,
        colorize: false,
        size: "10m",
        limit: { count: 5 },
      },
    },
    {
      target: "pino-pretty",
      options: {
        destination: path.resolve(__dirname, "../../logs/error.log"),
        mkdir: true,
        colorize: false,
        size: "10m",
        limit: { count: 5 },
      },
      level: "error",
    },
    {
      target: "pino-pretty",
      options: {
        destination: process.stdout.fd,
      },
    },
  ],
});

const logger = pino(
  {
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    redact: {
      paths: ["req.headers.cookie", "res.headers"],
      remove: true,
    },
  },
  transport
);

export default logger;
