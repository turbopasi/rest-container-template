const UserService               = require('../../injector').get('UserService');
const LogService                = require('../../injector').get('LogService');
const { ResourceNotFoundError } = require('../../util/error');

module.exports = async (req, res, next) => {
  try {

    const user = await UserService.FindById(req.params.id);

    if (!user) {
      LogService.error(`User read failed - User ${req.params.id} not found`);
      return next(new ResourceNotFoundError([
        {
          message : `User '${req.params.id} does not exist'`
        }
      ]));
    }

    res.data = user;
    LogService.info(`Requested user ${user._id} ${user.email}`)
    return next();

  } catch (ex) {
    return next(ex);
  }
}
