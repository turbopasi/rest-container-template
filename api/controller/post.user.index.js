const UserService = require('../../injector').get('UserService');
const LogService = require('../../injector').get('LogService');

module.exports = async (req, res, next) => {
  try {
    const newUser = await UserService.Create(req.body);
    res.data = newUser;
    LogService.info(`New user created ${newUser._id} ${newUser.email}`)
    return next();
  } catch (ex) {
    return next(ex);
  }
}
  