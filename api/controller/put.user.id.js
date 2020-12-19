const { UserService }     = require('../../services');
const userServiceInstance = new UserService();
const Joi                 = require('joi');

const schema = Joi.object({
  email : Joi.string().required()
});

module.exports = async(req, res) => {
  const body = await schema.validateAsync(req.body, {stripUnknown : true});
  const user = await userServiceInstance.FindByIdAndUpdate(req.params.id, body);
  return res.status(200).json(user);
}