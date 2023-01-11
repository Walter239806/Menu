import bcrypt from "bcrypt";
import Model from "../model/user.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const createUsr = async (req, res, next) => {
  try {
    const input = req.body;
    input.password = bcrypt.hashSync(input.password, 12);
    input.allergies = {
      alergias: input.alergias,
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
      return res.json({
        token: jwt.sign(
          { username: find.username, _id: find._id },
          config.JWTSecret,
          {
            expiresIn: "1D",
          }
        ),
      });
      // return res.send("Authenticated succesfully");1
    }
    return res.send("Invalid password");
  }
  return res.send("Invalid username");
};
