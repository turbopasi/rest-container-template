const mongoose = require('mongoose');

module.exports = async ({ config, LogService }) => {

  mongoose.connect(`mongodb+srv://${config.username}:${config.password}@template-cluster.lf07u.mongodb.net/${config.databasename}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  await open(db);
  LogService.info('MongoDB connected')

  return db;

}

function open (db) {
  return new Promise((resolve, reject) => {
    db.once('open', function() {
      return resolve();
    });
  });
}