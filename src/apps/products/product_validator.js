import Joi from "joi";

export const productCreateValdatr = Joi.object({
  catgory: Joi.string().min(3).max(15),
  name: Joi.string().min(3).max(15),
  price: Joi.number().min(3).max(50000000),
  quantity: Joi.number().min(3).max(5000000),
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
