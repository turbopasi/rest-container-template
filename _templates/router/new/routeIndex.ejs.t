---
inject: true
to: api/index.js
before: module.exports
---
const <%= route %>Routes = require('./routes/<%= route %>');


