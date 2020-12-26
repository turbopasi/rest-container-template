const UserService        = require('../../injector').get('UserService');
const LogService         = require('../../injector').get('LogService');
const EventService       = require('../../injector').get('EventService');
const { DuplicateError } = require('../../util/error');

module.exports = async (req, res, next) => {
  try {

    const newUser = await UserService.Create(req.body, { select : 'email username'});
    
    res.data = newUser;
    LogService.info(`New user created ${newUser._id} ${newUser.email}`);
    EventService.emit('NEW_USER');
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
  