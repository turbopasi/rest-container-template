const userRoutes = require('./routes/user');
const Controller = require('./controller/index');
const Middleware = require('./middleware/index');

module.exports = ({ config, LogService, UserService, router : parentRouter }) => {

  const controller = new Controller({
    config     : config,
    LogService : LogService,
    UserService: UserService
  });

  const middleware = new Middleware({
    config    : config,
    LogService: LogService
  });

  parentRouter.use('/user', userRoutes({
    middleware: middleware.user,
    controller: controller.user
  }));

  return parentRouter;

}  