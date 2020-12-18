const { Router }      = require('express');
const { UserService } = require('../../services');
const router          = Router();

const userServiceInstance = new UserService();

const Joi = require('joi');
const schema = Joi.object({
  email : Joi.string().required()
});

module.exports = (parentRouter) => {

  router.post('/', async (req, res) => {
    const body = await schema.validateAsync(req.body, {stripUnknown : true});
    const newUser = await userServiceInstance.Create(body);
    return res.status(201).json(newUser);
  });

  router.get('/:id', async(req, res) => {
    const user = await userServiceInstance.FindById(req.params.id);
    return res.status(200).json(user);
  });

  router.put('/:id', async(req, res) => {
    const body = await schema.validateAsync(req.body, {stripUnknown : true});
    const user = await userServiceInstance.FindByIdAndUpdate(req.params.id, body);
    return res.status(200).json(user);
  });

  router.delete('/:id', async(req, res) => {
    const user = await userServiceInstance.FindByIdAndDelete(req.params.id);
    return res.status(200).json(user);
  });

  parentRouter.use('/user', router);

}