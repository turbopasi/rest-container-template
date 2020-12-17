const assert = require('assert');
const { UserService } = require('../services');

describe('UserService', function() {

  beforeEach(async function() {
    const config = require('../config');
    await require('../loaders')({
      port        : config.express.port,
      consoleDebug: config.express.consoleDebug
    });
  });

  describe('#Create()', async function() {

    it('should create new user without error', async function () {
      const userServiceInstance = new UserService();
      const newUser = await userServiceInstance.Create({ email : 'test2@gmail.com' });
      return newUser;
    });


  });
});