const chai   = require('chai')
const should = chai.should();

const { UserService } = require('../services');

before(async () => {  
  const config = require('../config');
  await require('../loaders')({
    port        : config.express.port,
    consoleDebug: config.express.consoleDebug
  });
  return;
});

describe('UserService', async function() {

  const userServiceInstance = new UserService();
  let user;

  describe('Create', async function() {

    it('should create new user without error', async function () {
      user = await userServiceInstance.Create({ email : 'testmail' });
      return user;
    });

    it('should have defined email', function() {
      user.should.have.property('email');
    });

    it('should have defined _id', function() {
      user.should.have.property('_id');
    });

  });

  describe('Find', async function() {

    it('should find user without error', async function() {
      user = await userServiceInstance.Find({ email : 'testmail' });
      return user;
    });

    it('should be an array', async function() {
      user.should.be.an('array');
    });

    it('should have found at least one user', function() {
      user.length > 0
    });

  });

  describe('FindByIdAndUpdate', async function () {

    it('should find and update user without error', async function() {
        user = await userServiceInstance.FindByIdAndUpdate(user[0]._id, { email : 'anothermail' });
        return user;
    });

    it('should have new email', async function() {
      user.email == 'anothermail';
    });

  });

  describe('FindOneAndDelete', async function() {

    it('should delete user without error', async function() {
      user = await userServiceInstance.FindOneAndDelete({ email : 'anothermail' });
      return user;
    });

  });

});