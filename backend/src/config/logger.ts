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
      },
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
