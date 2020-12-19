const router = require('express').Router();

module.exports = ({ controller }) => {

  router.post('/', controller.post['/']);
  router.get('/:id', controller.get['/:id']);
  router.put('/:id', controller.put['/:id']);
  router.delete('/:id', controller.delete['/:id']);

  return router;
  
}