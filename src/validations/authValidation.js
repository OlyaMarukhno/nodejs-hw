import { Joi } from 'celebrate';

export const registerUserSchema = {
  body: Joi.object({
    name: Joi.string().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

export const loginUserSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};