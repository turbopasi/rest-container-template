const bodyParser = require('body-parser');
const cors       = require('cors');
const express    = require('express');
const routes     = require('../api');

module.exports = async ({ consoleDebug, port }) => {

  const app = express();

  app.get('/status', (req, res) => { return res.status(200).end(); });
  app.head('/status', (req, res) => { return res.status(200).end(); });
  app.enable('trust proxy');
  app.disable('x-powered-by');

  consoleDebug && app.use(require('morgan')('dev'));
  
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/', routes());

  await listen(app, port);

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