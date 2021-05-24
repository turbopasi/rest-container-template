---
inject: true
to: injector/index.js
after: // SERVICES
---
const { <%= h.inflection.camelize(name) %> } = require('../services');