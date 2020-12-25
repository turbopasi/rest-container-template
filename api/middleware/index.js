const ValidationService   = require('../../injector').get('ValidationService');
const { BadRequestError } = require('../../util/error');
const passport            = require('passport');

module.exports = {

  validate : {

    createUser : async (req, res, next) => {
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
    },

    updateUser : async (req, res, next) => {
      try {
        req.body = await ValidationService.check('updateUser', req.body, { stripUnknown : true });
        return next();
      } catch (ex) {
        if (ex.name === 'ValidationError') {
          return next(new BadRequestError(ex.details));
        } else {
          return next(ex);
        }
      }
    },

    loginUser : async (req, res, next) => {
      try {
        req.body = await ValidationService.check('loginUser', req.body, { stripUnknown : true });
        return next();
      } catch (ex) {
        if (ex.name === 'ValidationError') {
          return next(new BadRequestError(ex.details));
        } else {
          return next(ex);
        }        
      }
    }

  },

  authenticate : {
    user : passport.authenticate('jwt', {session: false})
  }

}