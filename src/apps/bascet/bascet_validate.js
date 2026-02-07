import Joi from "joi";

export const bascetValidate = Joi.object({
  productId: Joi.string(),
});

export const bascetAddValidate = Joi.object({
  productId: Joi.string(),
  quantity: Joi.number().default(1),
});

export function validate(params) {
  return (req, res, next) => {
    const { error } = params.validate(req.body);
    if (error) {
      console.log(error.detels.map((e) => e.message));
      res.status(400).json({ error: message });
    }
    next();
  };
}
