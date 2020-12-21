const { UserService, LogService } = require('../services');
const UserJoiModel      = require('../models').joi.user;
const UserMongooseModel = require('../models').mongoose.user;

/////////////////////////////////

function Container () {

  this.instances = {};
  this.register = (identifier, instance) => {
    if (this.instances[identifier]) {
      throw new Error (`instance '${identifier}' already registered`);
    } else {
      this.instances[identifier] = instance
    }
  }

  this.get = (identifier) => {
    if (!this.instances[identifier]) {
      throw new Error (`instance '${identifier}' does not exist`);
    } else {
      return this.instances[identifier];
    }
  }

}

const container = new Container();

//////////////////////////////////

const logServiceInstance = new LogService({
  host   : 'localhost',
  service: 'rest-container-template'
});

container.register('LogService', logServiceInstance);

//////////////////////////////////

const userServiceInstance = new UserService({
  mongooseModel: UserMongooseModel,
  joiModel     : UserJoiModel
});

container.register('UserService', userServiceInstance);

module.exports = container;

