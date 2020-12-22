const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, ms } = format;
const chalk = require('chalk')

const colorsFG = {
  error  : chalk.red,
  warn   : chalk.yellow,
  info   : chalk.white,
  http   : chalk.blue,
  verbose: chalk.gray,
  debug  : chalk.gray,
  silly  : chalk.gray
};

const colorsBG = {
  error  : chalk.black.bgRed,
  warn   : chalk.black.bgYellow,
  info   : chalk.black.bgWhite,
  http   : chalk.black.bgBlue,
  verbose: chalk.black.bgWhite,
  debug  : chalk.black.bgWhite,
  silly  : chalk.black.bgWhite
};

module.exports = function ({ host, service }) {

  const ConsoleFormat = printf(({ level, message, timestamp, host, service}) => {
    return `${chalk(timestamp)} - ${host} - ${service} - ${colorsBG[level](level.toUpperCase())} - ${colorsFG[level](message)}` 
  });

  const logger = createLogger({
    defaultMeta: { 
      host,
      service
    },
    transports: [
      new transports.Console({
        level:'silly',
        format: combine(
          timestamp(),
          ConsoleFormat
        )
      })
    ]
  });

  // this.error = logger.error;
  // this.warn = logger.warn;
  // this.info = logger.info;
  // this.http = logger.http;
  // this.verbose = logger.verbose;
  // this.debug = logger.debug;
  // this.silly = logger.silly;
  // this.log = logger.log;

  return logger;

}