const { UserService, LogService, ValidationService } = require('../services');
const JoiModel      = require('../models').joi;
const MongooseModel = require('../models').mongoose;

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
  mongooseModel: MongooseModel.user,
  // joiModel     : UserJoiModel
});

container.register('UserService', userServiceInstance);

///////////////////////////////////

const validationServiceInstance = new ValidationService({
  schemas : JoiModel
});

container.register('ValidationService', validationServiceInstance);

/////////////////////////////////

module.exports = container;

