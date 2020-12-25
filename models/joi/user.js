const Joi = require('joi');

const CreateUserSchema = Joi.object({
  email   : Joi.string().required(),
  password: Joi.string().required().min(8).max(20),
  username: Joi.string().required()
});

const UpdateUserSchema = Joi.object({
  email   : Joi.string(),
  password: Joi.string().min(8).max(20),
  username: Joi.string()
});

const LoginUserSchema = Joi.object({
  email   : Joi.string().required(),
  password: Joi.string().required()
});

module.exports = {
  createUser : CreateUserSchema,
  updateUser : UpdateUserSchema,
  loginUser  : LoginUserSchema
}