module.exports = ({ LogService, UserService }) => {

  return async (req, res, next) => {
    try {
      const user = await UserService.FindByIdAndDelete(req.params.id);
      res.data = user;
      return next();
    } catch (ex) {
      return next(ex);
    }
  }

}