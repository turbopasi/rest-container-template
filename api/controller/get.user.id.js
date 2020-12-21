const UserService = require('../../injector').get('UserService');

module.exports = async (req, res, next) => {
  try {
    const user = await UserService.FindById(req.params.id);
    res.data = user;
    return next();
  } catch (ex) {
    return next(ex);
  }
}
