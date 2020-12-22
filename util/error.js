class GeneralError extends Error {

  constructor(message = '', description = '') {
    
    super(message);

    this.name = this.constructor.name;

    this.data = {
      description: description,
      code       : 1337,
      errors     : [],
      status     : 500
    };

    Error.captureStackTrace(this, this.constructor);

    this.getHttpResponse = function () {
      return {
        status  : this.data.status,
        response: {
          code       : this.data.code,
          message    : this.message,
          description: this.data.description,
          errors     : this.data.errors
        }
      }
    }

  }

}

class BadRequestError extends GeneralError {
  constructor(errors = []) {
    super('That didn\'t look right');
    this.data = {
      description: 'There are problems with the data you sent us',
      code       : 1338,
      errors     : errors,
      status     : 400
    };
  }
}

class AuthenticationError extends GeneralError {
  constructor() {
    super('Unauthorized');
    this.data = {
      description: 'We can\'t allow you to do this, please go away',
      code       : 1339,
      errors     : [],
      status     : 401
    };
  }
}

class DuplicateError extends GeneralError {
  constructor(errors = []) {
    super('We have seen this before');
    this.data = {
      description: 'We are not able to use your data, since it does already exist',
      code : 1340,
      errors : errors,
      status : 400
    };
  }
}

class ResourceNotFoundError extends GeneralError {
  constructor(errors = []) {
    super('Resource not found');
    this.data = {
      description: 'We couldn\'t find what you were looking for',
      code : 1341,
      errors : errors,
      status : 404
    };
  }
}

function isCustomError (error) {
  if (
    error instanceof GeneralError || 
    error instanceof BadRequestError || 
    error instanceof AuthenticationError || 
    error instanceof DuplicateError ||
    error instanceof ResourceNotFoundError
  ) {
    return true
  } else {
    return false
  }
}

module.exports = {
  GeneralError,
  BadRequestError,
  AuthenticationError,
  DuplicateError,
  ResourceNotFoundError,
  isCustomError
};