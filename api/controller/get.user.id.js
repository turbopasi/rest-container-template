const { UserService }     = require('../../services');
const userServiceInstance = new UserService();

module.exports = async (req, res) => {
  const user = await userServiceInstance.FindById(req.params.id);
  return res.status(200).json(user);
}