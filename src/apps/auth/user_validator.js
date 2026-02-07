import joi from "joi";

export const signUpSchema = joi.object({
  username: joi.string().min(3).max(15).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).max(15).required(),
  found: joi.number().min(0).max(1000000000000),
  manzil: joi.string().required(),
  bascet: joi.array(),
  role: joi.string().default("user"),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).max(15).required(),
});

export const updateSchema = joi.object({
  username: joi.string().min(3).max(15),
  email: joi.string().email(),
  password: joi.string().min(3).max(15),
  found: joi.number(),
  manzil: joi.string(),
  role: joi.string().default("user"),
});

export function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const message = error.details.map((d) => d.message);
      return res.status(400).json({ error: message });
    }

    next();
  };
}
