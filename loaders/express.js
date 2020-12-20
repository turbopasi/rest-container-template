const bodyParser       = require('body-parser');
const cors             = require('cors');
const express          = require('express');
const routes           = require('../api');
const { GeneralError } = require('../util/errors');

module.exports = async ({ config, LogService, UserService }) => {

  const app = express();

  app.get('/status', (req, res) => { return res.status(200).end(); });
  app.head('/status', (req, res) => { return res.status(200).end(); });
  app.enable('trust proxy');
  app.disable('x-powered-by');

  // config.consoleDebug && app.use(require('morgan')('dev'));
  app.use((req, res, next) => {
    LogService.http(`${req.ip} ${req.method} ${req.path}`);
    return next();
  });
  
  // Some express middleware
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Load express routes
  app.use('/', routes({
    config     : config,
    LogService : LogService,
    UserService: UserService,
    router     : express.Router()
  }));

  app.use(handleErrors(LogService));

  // Start express server by listening to a port
  try {
    await listen(app, config.port);
  } catch (ex) {
    logger.error(`${ex.name} - ${ex.message}`);
  }

  return app;

}

function listen (app, port) {
  return new Promise((resolve, reject) => {
    app.listen(port, (err) => {
      if (err)  { return reject(err); }
      return resolve();
    });
  });
}

function handleErrors (LogService) {
  return (err, req, res, next) => {

    LogService.error(`${err.name}`);

    if (err instanceof GeneralError) {
      return res.status(err.getCode()).json({
        status : 'error',
        message: err.message
      });
    }

    if (err.name === 'ValidationError') {
      return res.status(402).json({
        status : 'error',
        message: err.message
      });
    }

    return res.status(500).json({
      status : 'error',
      message: 'Something went wrong'
    });

  }
}