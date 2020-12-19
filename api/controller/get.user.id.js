module.exports = ({ LogService, UserService }) => {

  return async (req, res, next) => {
    const user = await userServiceInstance.FindById(req.params.id);
    return res.status(200).json(user);
  }

}