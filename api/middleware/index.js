module.exports = function ({ config, LogService }) {

  this.user = {
    test : (req, res, next) => {
      LogService.info('User test middleware fired')
      return next
    }
  }

}