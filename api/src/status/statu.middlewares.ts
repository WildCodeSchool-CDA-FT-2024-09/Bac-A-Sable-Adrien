import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.number().required(),
  label: Joi.string().required(),
});

const validateStatu = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error == null) {
    next();
  } else {
    res.status(402).json(error);
  }
};

module.exports = validateStatu;
