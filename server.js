const container  = require('./injector');
const LogService = container.get('LogService');

async function startServer() {

  await require('./loaders')();
  LogService.info('Server started');

}

startServer(); 

// const general = new GeneralError('WoW', 'That\'s ugly');
// console.log(general.getHttpResponse());

// const badrequest = new BadRequestError()
// console.log(badrequest.getHttpResponse());

// const auth = new AuthenticationError();
// console.log(auth.getHttpResponse());



