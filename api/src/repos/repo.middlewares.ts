import { Response, Request, NextFunction } from "express";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  url: Joi.string().required(),
  isPrivate: Joi.number().min(1).max(2).required(),
});

const validateRepo = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error == null) {
    next();
  } else {
    res.status(422).json(error);
  }
};

module.exports = validateRepo;
