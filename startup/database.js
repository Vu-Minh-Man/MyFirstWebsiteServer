import config from "../config/config.js";
import mongoose from "mongoose";

export default function (logger) {
  mongoose
    .connect(config.db)
    .then(() => logger.info(`Connected to ${config.db}...`));
}
