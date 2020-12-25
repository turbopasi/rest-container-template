module.exports = {

  create : {
    user : require('./createUser'),
    login: require('./createLogin')
  },
  get : {
    user: require('./getUser')
  },
  update : {
    user: require('./updateUser')
  },
  delete : {
    user: require('./deleteUser')
  }

}