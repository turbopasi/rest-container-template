const chai   = require('chai')
const should = chai.should();
const axios = require('axios')
const config          = require('../config');

before(async () => {  
  await require('../loaders')();
  return;
}); 

let token = "";

describe('/user Endpoints', async function() {

  describe('POST /user create new user', async function () {

    it('should create new user without error', async function () {
      const respond = await axios.post(`http://localhost:${config.express.port}/user`, {
        username : 'pasi',
        email : 'test@testmail.com',
        password : '12345678'
      });
      return
    });

  });

  describe('POST /user/login login user', async function () {

    it('should return an access_token of logged in user', async function () {
      const respond = await axios.post(`http://localhost:${config.express.port}/user/login`, {
        email : 'test@testmail.com',
        password : '12345678'
      });
      token = respond.data.token;
      return;
    });

  });

  describe('DELETE /user delete user', async function () {

    it('should delete user without error', async function () {
      const respond = await axios.delete(`http://localhost:${config.express.port}/user`, { headers : { authorization : `bearer ${token}` } } );
      return
    });

  });


});