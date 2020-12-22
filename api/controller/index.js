module.exports = {

  create : {
    user: require('./post.user.index')
  },
  get : {
    user: require('./get.user.id')
  },
  update : {
    user: require('./put.user.id')
  },
  delete : {
    user: require('./delete.user.id')
  }

}