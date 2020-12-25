module.exports = {
  mongoose : {
    user : require('./mongoose/user')
  },
  joi : {
    createUser : require('./joi/user').createUser,
    updateUser : require('./joi/user').updateUser,
    loginUser  : require('./joi/user').loginUser
  }
}