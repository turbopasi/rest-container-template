const userRoutes = require('./routes/user');

const controller = require('./controller/index');
const middleware = require('./middleware/index');
const express    = require('express');
const router     = express.Router();

module.exports = () => {

  router.use('/user', userRoutes({
    middleware: middleware.user,
    controller: controller.user
  }));

  return router;

}  