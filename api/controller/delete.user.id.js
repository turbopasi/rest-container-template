module.exports = ({ LogService, UserService }) => {

  return async (req, res) => {
    const user = await userServiceInstance.FindByIdAndDelete(req.params.id);
    return res.status(200).json(user);
  }

}