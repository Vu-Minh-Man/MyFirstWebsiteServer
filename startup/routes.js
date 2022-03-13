//import config from "../config/config.js";

import express from "express";
import cors from "cors";
// import helmet from 'helmet';

//import corsEnabled from "../middleware/corsEnabled.js";
import userApi from "../routes/userApi.js";
import authApi from "../routes/authApi.js";
import topicApi from "../routes/discussion/topicApi.js";
import postApi from "../routes/discussion/postApi.js";
import apiErrorLogger from "./apiErrorLogger.js";

export default function (app, logger) {
  if (!process.env.SECRETKEY) {
    logger.warn(
      "SECRETKEY is not provided, the default key will be used to generate tokens."
    );
  }

  //app.use(corsEnabled);
  app.use(cors());
  app.use(express.json());
  app.use("/api/user", userApi);
  app.use("/api/login", authApi);
  app.use("/api/discussion/topics", topicApi);
  app.use("/api/discussion/topics", postApi);
  app.use(apiErrorLogger(logger));
  //app.use(helmet());
}
