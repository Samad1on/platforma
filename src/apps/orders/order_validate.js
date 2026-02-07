import Joi from "joi";

export const ordersValidate = Joi.object({
  productId: Joi.string(),
  quantity: Joi.number(),
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
