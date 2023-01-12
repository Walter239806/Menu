import { check, oneOf } from "express-validator";
import Model from "../model/food.js";

export const createFood = async (req, res, next) => {
  try {
    const input = req.body;

    const newPost = new Model(input);
    await newPost.save();

    return res.send({
      response: "Food entry saved correctly",
      _id: input._id,
    });
  } catch (error) {
    return next({
      Code: 501,
      message: error.message,
    });
  }
};

export const updateFood = async (req, res, next) => {
  try {
    const input = req.body;
    const response = await Model.updateOne(
      {
        name: input.name,
      },

      { ...input }
    );

    return res.send("Updated correctly");
  } catch (error) {
    return next({
      Code: 502,
      message: error.message,
    });
  }
};

export const showAllFood = async (req, res, next) => {
  try {
    const find = await Model.find();
    return res.send(find);
  } catch (error) {
    return next({
      code: 502,
      message: error.message,
    });
  }
};

export const readByIdFood = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const find = await Model.findById(_id);
    return res.send(find);
  } catch (error) {
    return next({
      code: 502,
      message: error.message,
    });
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    const input = req.body;
    const response = await Model.deleteOne({
      name: input.name,
    });

    return res.send("Deleted succesfully");
  } catch (error) {
    return next({
      Code: 503,
      message: error.message,
    });
  }
};

export const createValidation = [
  check("nombre").exists().isString().withMessage("Es requerido un nombre"),
  check("type")
    .exists()
    .contains(
      ["proteina", "carbohidrato", "vegetal", "fruta", "azucar", "grasa"],
      { ignoreCase: true }
    )
    .withMessage("Es requerido un tipo"),
  check("calorias").exists().not().isString(),
  check("gluten").exists().isBoolean(),
];

export const updateValidation = [
  check("name").exists().isString().withMessage("Es requerido un nombre"),
  oneOf(
    check("type")
      .exists()
      .contains(
        ["proteina", "carbohidrato", "vegetal", "fruta", "azucar", "grasa"],
        { ignoreCase: true }
      )
      .withMessage("Es requerido un tipo"),
    check("calorias").exists().not().isString(),
    check("gluten").exists().isBoolean()
  ),
];

export const deleteValidation = [
  check("name").exists().isString().withMessage("Es requerido un nombre"),
];
