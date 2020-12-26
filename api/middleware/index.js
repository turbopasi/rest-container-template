module.exports = {
  validate : {
    createUser: require('./validate.createUser'),
    updateUser: require('./validate.updateUser'),
    loginUser : require('./validate.loginUser')
  },
  authenticate : {
    user: require('./authenticate')
  }
}