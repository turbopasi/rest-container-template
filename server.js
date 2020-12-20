const config         = require('./config');
const errors         = require('./util/errors');
const LogService     = new require('./services').LogService({
  host   : 'localhost',
  service: 'rest-container-template'
});

async function startServer() {

  await require('./loaders')({
    errors    : errors,
    config    : config,
    LogService: LogService
  });

  LogService.info('Server started');

}

startServer(); 

