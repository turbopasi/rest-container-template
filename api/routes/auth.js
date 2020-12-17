const { Router } = require('express');
const router     = Router();

module.exports = (parentRouter) => {

  router.get('/', async(req, res) => {
    return res.status(200).json("/auth")
  });

  parentRouter.use('/auth', router);

}