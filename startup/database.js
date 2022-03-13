import config from "../config/config.js";
import mongoose from "mongoose";

export default function (logger) {
  mongoose
    .connect(config.dbDiscussion)
    .then(() => logger.info(`Connected to ${config.dbDiscussion}...`));
}
