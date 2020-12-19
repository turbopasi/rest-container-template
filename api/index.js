const userRoutes = require('./routes/user');
const Controller = require('./controller/index');

module.exports = ({ config, LogService, UserService, router : parentRouter }) => {

  const controller = new Controller({
    config     : config,
    LogService : LogService,
    UserService: UserService
  });

  parentRouter.use('/user', userRoutes({
    controller: controller.user,
  }));

  return parentRouter;

}  