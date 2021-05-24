const mongoose           = require('mongoose');
const {mongodb : config} = require('../config');
const LogService         = require('../injector').get('LogService');

module.exports = async () => {

  mongoose.connect(`mongodb+srv://${config.username}:${config.password}@${config.custerURL}/${config.databasename}?retryWrites=true&w=majority`, {
    useNewUrlParser   : config.useNewUrlParser,
    useUnifiedTopology: config.useUnifiedTopology,
    useCreateIndex    : config.useCreateIndex,
    useFindAndModify  : config.useFindAndModify
  });

  const db = mongoose.connection;

  try {
    await open(db);
    LogService.info('mongodb connected')
  } catch (ex) {
    LogService.error(ex.message)
  }

  return db;

}

function open (db) {
  return new Promise((resolve, reject) => {
      
    db.on('error', function (error) {
      return reject(error);
    });

    db.once('open', function() {
      return resolve();
    });

  });
}