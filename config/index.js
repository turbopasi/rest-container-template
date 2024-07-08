const dotenv = require('dotenv');
const os     = require('os');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const found = dotenv.config();
if (found.error) { throw new Error('Couldn\'t find .env file'); }

module.exports = {
  hostname: os.hostname(),
  express : {
    port        : process.env.PORT,
    consoleDebug: process.env.CONSOLE_DEBUG
  },
  jwt: {
    secret    : process.env.JWTSECRET,
    expiration: parseInt(process.env.JWTEXPIRATION)
  },
  mongodb: {
    username          : process.env.MONGODB_USERNAME,
    password          : process.env.MONGODB_PASSWORD,
    databasename      : process.env.MONGODB_DATABASENAME,
    clusterURL        : process.env.MONGODB_CLUSTERURL
  }
}