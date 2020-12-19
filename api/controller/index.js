module.exports = {
  user : {
    get : {
      '/:id': require('./get.user.id')
    },
    post : {
      '/': require('./post.user.index')
    },
    put : {
      '/:id': require('./put.user.id')
    },
    delete : {
      '/:id': require('./delete.user.id')
    }
  }
}