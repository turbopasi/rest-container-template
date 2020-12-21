module.exports = {

  user : {
    test : (req, res, next) => {
      LogService.info('User test middleware fired')
      return next
    }
  }

}