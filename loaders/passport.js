const passport                  = require('passport');
const passportJWT               = require('passport-jwt');
const ExtractJwt                = passportJWT.ExtractJwt;
const JwtStrategy               = passportJWT.Strategy;
const UserService               = require('../injector').get('UserService');
const { ResourceNotFoundError } = require('../util/error');
const config                    = require('../config')

module.exports = async () => {

  const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey    : config.jwt.secret
  };

  async function verify (payload, next) {

    try {

      const user = await UserService.FindById(payload.id);

      if (!user) {
        LogService.error(`User read failed - User ${req.params.id} not found`);
        return next(new ResourceNotFoundError([
          {
            message : `User '${req.params.id} does not exist'`
          }
        ]));
      }

      return next(null, user);

    } catch (ex) {
      return next(ex);
    }

  }

  const strategy = new JwtStrategy(options, verify);
  passport.use(strategy);

  return true;

}