---
inject: true
to: api/controller/index.js
after: <%= controllerCategory %>
---
    <%= controller %>: require('./<%= controller %>'),