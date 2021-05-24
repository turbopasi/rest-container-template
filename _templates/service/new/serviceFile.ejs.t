---
to: services/<%= name %>.js
---
module.exports = function ({ config }) {

  this.config  = config;
  this.Example = Example;

}

async function Example () {
  try {
    return true
  } catch (ex) {
    throw ex;
  }
}