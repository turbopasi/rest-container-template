const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const found = dotenv.config();
if (found.error) { throw new Error('Couldn\'t find .env file'); }

module.exports = {
  express : {
    port        : process.env.PORT,
    consoleDebug: process.env.CONSOLE_DEBUG
  },
  mongodb: {
    username          : process.env.MONGODB_USERNAME,
    password          : process.env.MONGODB_PASSWORD,
    databasename      : process.env.MONGODB_DATABASENAME,
    useNewUrlParser   : true,
    useUnifiedTopology: true,
    useCreateIndex    : true,
    useFindAndModify  : false
  }
}