const bodyParser = require('body-parser');
const cors       = require('cors');
const express    = require('express');
const api        = require('../api');
const utilError  = require('../util/error');

const { express : config } = require('../config');
const container            = require('../injector');
const LogService           = container.get('LogService');

module.exports = async () => {

  const app = express();

  // Some express settings
  app.enable('trust proxy');
  app.disable('x-powered-by');

  // Some intern express middleware
  app.use((req, res, next) => {
    LogService.http(`${req.ip} ${req.method} ${req.path}`);
    return next();
  });
  
  // Some extern express middleware
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Load express routes
  app.use('/', api());
  app.get('/status', (req, res) => { return res.status(200).end(); });
  app.head('/status', (req, res) => { return res.status(200).end(); });
  app.get('*', (req, res) => { return res.status(404).end(); });
  app.post('*', (req, res) => { return res.status(404).end(); });
  app.put('*', (req, res) => { return res.status(404).end(); });
  app.delete('*', (req, res) => { return res.status(404).end(); });

  // Error handling
  app.use(handleRequestErrors(LogService, utilError));

  // Start express server by listening to a port
  try {
    await listen(app, config.port);
  } catch (ex) {
    logger.error(`${ex.name} - ${ex.message}`);
  }

  return app;

}

///////////// LOCAL HELPER FUNCTIONS /////////////////

function listen (app, port) {
  return new Promise((resolve, reject) => {
    app.listen(port, (err) => {
      if (err)  { return reject(err); }
      return resolve();
    });
  });
}

function handleRequestErrors (LogService, utilError) {
  return (err, req, res, next) => {

    LogService.error(`${err.name} ${err.message}`);

    if (utilError.isCustomError(err)) {
      const errData = err.getHttpResponse();
      return res.status(errData.status).json(errData.response);
    } else {
      const generalError = new utilError.GeneralError('Something went wrong', 'There was an unforseen problem with your request, please try again later');
      const errData = generalError.getHttpResponse();
      return res.status(errData.status).json(errData.response);
    }

  }
}
