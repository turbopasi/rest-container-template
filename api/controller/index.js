module.exports = function ({ config, LogService, UserService }) {

  const userOptions = {
    LogService : LogService,
    UserService: UserService
  }

  this.user = {
    get : {
      '/:id': require('./get.user.id')(userOptions)
    },
    post : {
      '/': require('./post.user.index')(userOptions)
    },
    put : {
      '/:id': require('./put.user.id')(userOptions)
    },
    delete : {
      '/:id': require('./delete.user.id')(userOptions)
    }
  }


}