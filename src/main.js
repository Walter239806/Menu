import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import config from "./config/index.js";
import database from "./db/index.js";
import { logger } from "./tools/basiclogs.js";
import routes from "./routes/index.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(routes);

const conn = database.setConnection();

if (!conn) {
  logger.error("DB Conn error!:");
  process.exit(1);
}

const server = app.listen(config.NODE_PORT, () => {
  logger.info(`Listening to port ${config.NODE_PORT}`);
});

export { app, server };
