module.exports = async (req, res, next) => {
  try {
    const newUser = await UserService.Create(req.body);
    res.data = newUser;
    return next();
  } catch (ex) {
    return next(ex);
  }
}
  