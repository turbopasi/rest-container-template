const UserService               = require('../../injector').get('UserService');
const LogService                = require('../../injector').get('LogService');
const { ResourceNotFoundError } = require('../../util/error');

module.exports = async (req, res, next) => {
  try {

    const user = await UserService.FindByIdAndDelete(req.params.id);

    if (!user) {
      LogService.error(`Tried to delete user ${req.params.id} but was not found`);
      return next(new ResourceNotFoundError([
        {
          message : `User '${req.params.id} does not exist'`
        }
      ]));
    }

    res.data = user;
    LogService.info(`User ${user._id} deleted`);
    return next();

  } catch (ex) {
    return next(ex);
  }
}

