const expressLoader  = require('./express');
const mongooseLoader = require('./mongoose');
const passportLoader = require('./passport');
const container      = require('../injector');
const LogService     = container.get('LogService');

module.exports = async () => {

  await expressLoader();
  LogService.info('Express initialized')

  await mongooseLoader();
  LogService.info('Mongoose initialized');

  await passportLoader();
  LogService.info('Passport initialized');

}