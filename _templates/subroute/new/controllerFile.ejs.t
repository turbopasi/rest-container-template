---
to: api/controller/<%= controller %>.js
---
const LogService = require('../../injector').get('LogService');

module.exports = async (req, res, next) => {
  try {

    return next();

  } catch (ex) {

    return next(ex);

  }
}