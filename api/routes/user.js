const router = require('express').Router();

module.exports = ({ controller, middleware }) => {

  router.post('/', middleware.create, controller.post['/'], (req, res) => {
    return res.status(200).json(res.data);
  });

  router.get('/:id', controller.get['/:id'], (req, res) => {
    return res.status(200).json(res.data);
  });

  router.put('/:id', controller.put['/:id'], (req, res) => {
    return res.status(200).json(res.data);
  });

  router.delete('/:id', controller.delete['/:id'], (req, res) => {
    return res.status(200).json(res.data);
  });

  return router;
  
}