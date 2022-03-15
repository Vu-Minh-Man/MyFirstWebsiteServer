import config from "../config/config.js";
import { createLogger, transports } from "winston";
import "winston-mongodb";

export default createLogger({
  transports: [
    new transports.File({ filename: "errors.log" }),
    new transports.Console({ colorize: true, prettyPrint: true }),
    new transports.MongoDB({
      db: config.dbLogger,
      level: "info",
      options: {
        poolSize: 2,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "uncaughtExceptions.log" }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: "unhandledRejection.log" }),
  ],
});
