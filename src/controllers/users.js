import bcrypt from "bcrypt";
import Model from "../model/user.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { check, oneOf } from "express-validator";

export const createUsr = async (req, res, next) => {
  try {
    const input = req.body;
    input.password = bcrypt.hashSync(input.password, 12);
    input.allergies = {
      alergias: input.allergies,
    };

    const newPost = new Model(input);
    await newPost.save();

    return res.send({
      response: "User created succesfully",
      _id: input._id,
    });
  } catch (error) {
    return next({
      Code: 501,
      message: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  const input = req.body;
  const find = await Model.findOne({ username: input.username });
  if (find != null) {
    let validPassword = await bcrypt.compareSync(input.password, find.password);
    console.log(validPassword);
    if (validPassword) {
      const token = jwt.sign(
        { username: find.username, _id: find._id },
        config.JWTSecret,
        { expiresIn: "1D" }
      );

      return res.status(200).send(token);
    }
    return res.send("Invalid password");
  }
  return res.send("Invalid username");
};

export const updateUsr = async (req, res, next) => {
  try {
    const input = req.body;
    input.password = bcrypt.hashSync(input.password, 12);
    const response = await Model.updateOne(
      {
        username: input.username,
      },

      { ...input }
    );

    return res.send({ response: !!response.modifiedCount });
  } catch (error) {
    return next({
      Code: 502,
      message: error.message,
    });
  }
};

export const changePass = async (req, res, next) => {
  try {
    const input = req.body;
    const valor = await Model.findOne({ username: input.username });
    const pass = valor.password;
    const validPassword = await bcrypt.compare(input.password, pass);
    if (validPassword) {
      if (input.newPassword === input.confirmPassword) {
        const checkNewP = await bcrypt.compare(input.newPassword, pass);
        if (checkNewP)
          return res.send({ response: "Password es igual al antiguo" });

        await Model.updateOne(
          {
            _id: input._id,
          },
          {
            password: bcrypt.hashSync(input.newPassword, 12),
          }
        );
        return res.send({ response: "Se cambio el password correctamente" });
      }
      return res.send({ response: "Password nuevo no coincide" });
    }
    return res.send({ response: "Password antiguo no coincide" });
  } catch (error) {
    return next({
      Code: 502,
      message: error.message,
    });
  }
};

export const changePasswordValidation = [
  check("username").exists().isEmail().withMessage("Es requerido un username"),
  check("password")
    .exists()
    .isLength({ min: 8 })
    .withMessage("Es requerido el password antiguo"),
  check("newPassword")
    .exists()
    .isLength({ min: 8 })
    .withMessage("Es requerido un nuevo password"),
  check("confirmPassword")
    .exists()
    .isLength({ min: 8 })
    .withMessage("Es requerido confirmacion de password"),
];

export const createValidation = [
  check("username").exists().isEmail().withMessage("Es requerido un username"),
  check("password")
    .exists()
    .isLength({ min: 8 })
    .withMessage("Es requerido un password"),
  check("age").exists().not().isString().withMessage("Edad es requerida"),
  check("fullname")
    .exists()
    .isString()
    .withMessage("Nombre completo es requerido"),
  check("allergies").isString().withMessage("Es requerido informacion"),
];

export const loginValidation = [
  check("username").exists().isEmail().withMessage("Es requerido un username"),
  check("password")
    .exists()
    .isLength({ min: 8 })
    .withMessage("Es requerido un password"),
];
