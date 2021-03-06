const UserService                               = require('../../injector').get('UserService');
const LogService                                = require('../../injector').get('LogService');
const { ResourceNotFoundError, DuplicateError } = require('../../util/error');

module.exports = async(req, res, next) => {
  try {

    const user = await UserService.FindByIdAndUpdate(req.user._id, req.body);

    if (!user) {
      LogService.error(`User update failed - User ${req.user._id} not found`);
      return next(new ResourceNotFoundError([
        {
          message : `User '${req.user._id} does not exist'`
        }
      ]));
    }

    res.data = user;
    LogService.info(`User ${user._id} updated`);
    return next();

  } catch (ex) {
    
    if (ex.name === 'MongoError' && ex.code === 11000) {
      const duplicate = new DuplicateError([{
        message: `${Object.keys(ex.keyValue)[0]} '${Object.values(ex.keyValue)[0]}' is already in use. Please use something else.`,
        key    : `${Object.keys(ex.keyValue)[0]}`
      }]);
      return next(duplicate);
    } else {
      return next(ex);
    }

  }
}
  
