const router = require('express').Router();

/**
 * @param {object} options
 * @returns {object} Express.Router
 * @description Bundles middleware functions and route controllers into express routes and returns router
 */

module.exports = ({ controller, middleware }) => {

  router.post('/login', middleware.validate.loginUser, controller.create.login, (req, res) => {
    return res.status(200).json(res.data);
  });

  router.post('/', middleware.validate.createUser, controller.create.user, (req, res) => {
    return res.status(201).json(res.data);
  });

  router.get('/', middleware.authenticate.user, controller.get.user, (req, res) => {
    return res.status(200).json(res.data);
  });

  router.put('/', middleware.authenticate.user, middleware.validate.updateUser, controller.update.user, (req, res) => {
    return res.status(200).json(res.data);
  });

  router.delete('/', middleware.authenticate.user, controller.delete.user, (req, res) => {
    return res.status(204).end();
  });

  return router;
  
}