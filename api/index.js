const controller = require('./controller/index');
const middleware = require('./middleware/index');
const express    = require('express');
const router     = express.Router();
const userRoutes = require('./routes/user');

module.exports = () => {

  router.use('/user', userRoutes({ middleware, controller }));
  return router;

}