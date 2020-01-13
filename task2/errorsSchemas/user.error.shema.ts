import * as Joi from "joi";

export const userErrorSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required().regex(/(([a-z]+\d+)|(\d+[a-z]+))[a-z\d]*/, 'password must contain letters and numbers'),
  age: Joi.number().min(4).max(130).required()
})