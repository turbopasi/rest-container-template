const config = require('./config');

async function startServer() {

  await require('./loaders')({
    port        : config.express.port,
    consoleDebug: config.express.consoleDebug
  });

}

startServer(); 

