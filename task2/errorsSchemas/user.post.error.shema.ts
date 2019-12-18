import * as Joi from "joi";

export const userPostErrorSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().min(4).max(130).required()
})