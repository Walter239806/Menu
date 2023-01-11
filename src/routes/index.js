import express from "express";
import config from "../config/index.js";
import { createUsr, login } from "../controllers/users.js";
import checkToken from "../middlewares/checktoken.js";

const router = express.Router();

router.get("/healthcheck", (_, res) => {
  res.send({
    app: config.APP_NAME,
    version: config.APP_VERSION,
  });
});

router.post("/user/create", checkToken, createUsr);
router.post("/user/login", login);

export default router;
