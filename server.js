import config from "./config/config.js";

import express from "express";

import logger from "./startup/logging.js";
import setUpRoutes from "./startup/routes.js";
import setUpDatabase from "./startup/database.js";

const app = express();

setUpRoutes(app, logger);
setUpDatabase(logger);

const server = app.listen(config.port, () =>
  logger.info(`Listening on port ${config.port}...`)
);

export default server;
