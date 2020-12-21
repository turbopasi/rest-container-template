const config     = require('./config');
const errors     = require('./util/errors');
const container  = require('./injector');
const LogService = container.get('LogService');

async function startServer() {

  await require('./loaders')();

  LogService.info('Server started');

}

startServer(); 


