const { UserService, LogService, ValidationService, EventService } = require('../services');
const JoiModel                                       = require('../models').joi;
const MongooseModel                                  = require('../models').mongoose;
const jsonwebtoken                                   = require('jsonwebtoken');
const config                                         = require('../config');

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
  host   : config.hostname,
  service: 'rest-container-template'
});

container.register('LogService', logServiceInstance);

//////////////////////////////////

const userServiceInstance = new UserService({
  mongooseModel: MongooseModel.user,
  jsonwebtoken : jsonwebtoken,
  config       : config
});

container.register('UserService', userServiceInstance);

///////////////////////////////////

const validationServiceInstance = new ValidationService({
  schemas : JoiModel
});

container.register('ValidationService', validationServiceInstance);

/////////////////////////////////

const eventServiceInstance = new EventService({
  EventEmitter : require('events')
});

container.register('EventService', eventServiceInstance);

module.exports = container;

