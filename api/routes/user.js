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

  router.get('/', async(req, res) => {
    return res.status(200).json("GET /user")
  });

  parentRouter.use('/user', router);

}