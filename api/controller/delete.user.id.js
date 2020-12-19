const { UserService }     = require('../../services');
const userServiceInstance = new UserService();

module.exports = async (req, res) => {
  const user = await userServiceInstance.FindByIdAndDelete(req.params.id);
  return res.status(200).json(user);
}