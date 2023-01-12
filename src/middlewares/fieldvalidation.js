import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = errors.array().reduce((acc, err) => {
    acc += `${err.param}: ${err.msg}. `;

    return acc;
  }, "");

  console.log("extractedErrors :>> ", extractedErrors);

  return res.send({ status: 400, code: 1000, message: errors.array() });
};

export default validate;
