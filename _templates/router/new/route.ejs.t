---
to: api/routes/<%= route %>.js
---
const router = require('express').Router();

module.exports = ({ controller, middleware }) => {

  return router;
  
}


