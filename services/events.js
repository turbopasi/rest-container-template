module.exports = function ({ EventEmitter, LogService }) {

  class CustomEventEmitter extends EventEmitter {}
  const customEmitter = new CustomEventEmitter();

  customEmitter.on('NEW_USER', (data) => {
    console.log('NEW_USER');
  });

  customEmitter.on('USER_DELETED', (data) => {
    console.log('USER_DELETED');
  });

  customEmitter.on('PASSWORD_RESET', (data) => {
    console.log('PASSWORD_RESET');
  });

  return customEmitter;

}