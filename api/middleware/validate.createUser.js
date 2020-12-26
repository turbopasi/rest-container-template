const ValidationService   = require('../../injector').get('ValidationService');
const { BadRequestError } = require('../../util/error');

module.exports = async (req, res, next) => {

  try {
    req.body = await ValidationService.check('createUser', req.body, { stripUnknown : true });
    return next();
  } catch (ex) {
    if (ex.name === 'ValidationError') {
      return next(new BadRequestError(ex.details));
    } else {
      return next(ex);
    }
  }
}