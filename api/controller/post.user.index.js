module.exports = ({ LogService, UserService }) => {

  return async (req, res) => {
    const body = await schema.validateAsync(req.body, {stripUnknown : true});
    const newUser = await userServiceInstance.Create(body);
    return res.status(201).json(newUser);
  }
  
}