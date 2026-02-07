import joi from "joi";

export const userIdValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).max(15).required(),
});

export const updateSchema = joi.object({
  _id: joi.string(),
  username: joi.string().min(3).max(15),
  email: joi.string().email(),
  password: joi.string().min(3).max(15),
  found: joi.number(),
  role: joi.string().default("user"),
});

// export const userIdValidation = joi.object({
//   email: joi.string().email().required(),
//   password: joi.string().min(3).max(15).required(),
// });

export function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.detels.map((d) => d.message);
      return res.status(400).json({ error: message });
    }

    next();
  };
}
