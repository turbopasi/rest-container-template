const ValidationService = require('../../injector').get('ValidationService');

module.exports = {

  user : {
    create : async (req, res, next) => {
      try {
        req.body = await ValidationService.check('createUser', req.body, { stripUnknown : true });
        return next();
      } catch (ex) {
        return next(ex);
      }
    }
  }

}