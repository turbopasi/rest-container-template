const expressLoader  = require('./express');
const mongooseLoader = require('./mongoose');

const container = require('../injector');
const LogService = container.get('LogService');

module.exports = async ({
  config
}) => {

  await expressLoader();
  LogService.info('Express initialized')

  await mongooseLoader();
  LogService.info('Mongoose initialized');

}