import express from "express";
import config from "../config/index.js";
import * as usr from "../controllers/users.js";
import * as food from "../controllers/food.js";
import checkToken from "../middlewares/checktoken.js";
import validate from "../middlewares/fieldvalidation.js";

const router = express.Router();

router.get("/healthcheck", (_, res) => {
  res.send({
    app: config.APP_NAME,
    version: config.APP_VERSION,
  });
});

router.post("/user/create", usr.createValidation, validate, usr.createUsr);
router.post("/user/update", checkToken, usr.updateUsr);
router.post(
  "/user/changePassword",
  checkToken,
  usr.changePasswordValidation,
  validate,
  usr.changePass
);
router.post("/user/login", usr.loginValidation, validate, usr.login);

router.post(
  "/food/create",
  checkToken,
  food.createValidation,
  validate,
  food.createFood
);
router.post(
  "/food/update",
  checkToken,
  food.updateValidation,
  validate,
  food.updateFood
);
router.post(
  "/food/delete",
  checkToken,
  food.deleteValidation,
  validate,
  food.deleteFood
);
router.post("/food/showall", checkToken, food.showAllFood);

export default router;
