import { validationResult } from "express-validator";

export const validate2 = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      succes: false,
      errors: errors.array(),
    });
  }
  next();
};
