---
inject: true
to: api/index.js
after: express.Router();
---
const <%= baseRoute %>Routes = require('./routes/<%= baseRoute %>');