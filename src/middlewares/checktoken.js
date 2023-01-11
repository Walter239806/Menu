import jwt from "jsonwebtoken";
import config from "../config/index.js";

const checkToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader === undefined) {
    return next({
      status: 498,
      code: 2001,
      message: `TOKEN indefinido desde ${req.protocol}://${req.get("host")}${
        req.originalUrl
      }`,
      userMessage: `Token indefinido`,
    });
  }

  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  jwt.verify(token, config.JWTSecret, (err, decoded) => {
    if (err) {
      return next({ status: 498, code: 2002, message: err.toString() });
    }
    req.user = decoded.data;
    next();
  });
};

export default checkToken;
