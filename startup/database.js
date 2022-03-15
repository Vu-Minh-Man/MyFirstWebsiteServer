import config from "../config/config.js";
import mongoose from "mongoose";

export default function (logger) {
  mongoose
    .connect(config.db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info(`Connected to ${config.db}...`))
    .catch((err) => logger.info(err));
}
