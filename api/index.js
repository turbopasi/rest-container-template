const { Router } = require('express');
const user       = require('./routes/user');

module.exports = () => {

  // Main Router 
  const router = Router();

  user(router);

  return router;

}  