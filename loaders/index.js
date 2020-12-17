const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

module.exports = async ({
  port,
  consoleDebug
}) => {

  await expressLoader({ port, consoleDebug });
  console.log('Express Initialized');

  await mongooseLoader();
  console.log('Mongoose Initialized');

}