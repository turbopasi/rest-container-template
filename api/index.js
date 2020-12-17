const { Router } = require('express');
const user       = require('./routes/user');
const public     = require('./routes/public');
const auth       = require('./routes/auth');

module.exports = () => {

  // Main Router 
  const router = Router();

  user(router);
  public(router);
  auth(router);

  return router;

}  