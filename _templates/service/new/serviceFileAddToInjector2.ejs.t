---
inject: true
to: injector/index.js
before: module.exports
---

/////////////////////////////////

const <%= name %>Instance = new <%= h.inflection.camelize(name) %>({
  config : config
});

container.register('<%= h.inflection.camelize(name) %>', <%= name %>Instance);
