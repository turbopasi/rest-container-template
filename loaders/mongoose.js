const mongoose = require('mongoose');
const config   = require('../config');

module.exports = async () => {

  mongoose.connect(`mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@template-cluster.lf07u.mongodb.net/${config.mongodb.databasename}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  await open(db);

  return db;

}

function open (db) {
  return new Promise((resolve, reject) => {
    db.once('open', function() {
      return resolve();
    });
  });
}