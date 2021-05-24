---
inject: true
to: services/index.js
after: module.exports
---
  <%= h.inflection.camelize(name) %> : require('./<%= name %>'),