const expressLoader  = require('./express');
const mongooseLoader = require('./mongoose');

const UserJoiModel      = require('../models').joi.user;
const UserMongooseModel = require('../models').mongoose.user;
const { UserService }   = require('../services');
const UserServiceInstance = new UserService({
  mongooseModel: UserMongooseModel,
  joiModel     : UserJoiModel
})

module.exports = async ({
  config,
  LogService
}) => {

  await expressLoader({
    config     : config.express,
    LogService : LogService,
    UserService: UserServiceInstance
  });
  LogService.info('Express initialized')

  await mongooseLoader({
    config    : config.mongodb,
    LogService: LogService
  });
  LogService.info('Mongoose initialized');

}