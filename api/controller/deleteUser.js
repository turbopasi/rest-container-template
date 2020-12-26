const UserService               = require('../../injector').get('UserService');
const LogService                = require('../../injector').get('LogService');
const EventService              = require('../../injector').get('EventService');
const { ResourceNotFoundError } = require('../../util/error');

module.exports = async (req, res, next) => {
  try {

    const user = await UserService.FindByIdAndDelete(req.user._id);

    if (!user) {
      LogService.error(`User delete failed - User ${req.user._id} not found`);
      return next(new ResourceNotFoundError([
        {
          message : `User '${req.user._id} does not exist'`
        }
      ]));
    }

    res.data = user;
    LogService.info(`Deleted user ${user._id}`);
    EventService.emit('USER_DELETED');
    return next();

  } catch (ex) {
    return next(ex);
  }
}

