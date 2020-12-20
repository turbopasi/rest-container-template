const Joi = require('joi');

const CreateUserSchema = Joi.object({
  email   : Joi.string().required(),
  username: Joi.string().required()
});

const UpdateUserSchema = Joi.object({
  email   : Joi.string(),
  username: Joi.string()
});

module.exports = {
  createUser : CreateUserSchema,
  updateUser : UpdateUserSchema
}