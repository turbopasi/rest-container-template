---
inject: true
to: api/index.js
before: return router;
---
  router.use('/<%= baseRoute %>', <%= baseRoute %>Routes({ middleware, controller }));