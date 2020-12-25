const UserService               = require('../../injector').get('UserService');
const LogService                = require('../../injector').get('LogService');
const { ResourceNotFoundError } = require('../../util/error');

module.exports = async (req, res, next) => {
  try {
    const user = await UserService.FindById(req.user._id, {select : '-__v -password -_id -createdAt -updatedAt'});

    if (!user) {

      LogService.error(`User read failed - User ${req.user._id} not found`);
      return next(new ResourceNotFoundError([
        {
          message : `User '${req.user._id} does not exist'`
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
