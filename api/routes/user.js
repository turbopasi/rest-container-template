const { Router }          = require('express');
const controller          = require('../controller');
const router              = Router();

module.exports = (parentRouter) => {

  router.post('/', controller.user.post['/']);
  router.get('/:id', controller.user.get['/:id']);
  router.put('/:id', controller.user.put['/:id']);
  router.delete('/:id', controller.user.delete['/:id']);

  parentRouter.use('/user', router);

}