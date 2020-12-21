module.exports = async(req, res, next) => {
  try {
    const user = await UserService.FindByIdAndUpdate(req.params.id, req.body);
    res.data = user;
    return next();
  } catch (ex) {
    return next(ex);
  }
}
  
