const UserService             = require('../../injector').get('UserService');
const LogService              = require('../../injector').get('LogService');
const { AuthenticationError } = require('../../util/error');

module.exports = async (req, res, next) => {
  try {

    const token = await UserService.Login(req.body);
    
    if (!token) {
      LogService.error(`Login failed - Unable to create token for ${req.body.email}`);
      return next(new AuthenticationError());
    }

    res.data = { token };
    LogService.info(`Login successful for ${req.body.email}`)
    return next();

  } catch (ex) {

      return next(ex);

  }
}