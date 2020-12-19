const config         = require('./config');
const LogService     = new require('./services').LogService({
  host   : 'localhost',
  service: 'rest-container-template'
});

async function startServer() {

  await require('./loaders')({
    config    : config,
    LogService: LogService
  });

  LogService.info('Server started');

}

startServer(); 

