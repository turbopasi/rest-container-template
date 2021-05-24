---
inject: true
to: api/routes/<%= baseRoute %>.js
before: return router;
---
  router.<%= h.changeCase.lower(method) %>('/<%= subRoute %>', controller.<%= controllerCategory %>.<%= controller %>, (req, res) => {
    return res.status(200).json(res.data);
  });
  