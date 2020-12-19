const winston = require('winston');


module.exports = function ({ host, service }) {

  const logger = winston.createLogger({
    level:'silly',
    format: winston.format.simple(),
    defaultMeta: { 
      host,
      service
    },
    transports: [
      new winston.transports.Console()
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