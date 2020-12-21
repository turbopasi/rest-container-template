module.exports = function ({ schemas }) {

  this.schemas = schemas;
  this.check = check

}

async function check (identifier, data, options = {}) {

  try {

    if (!this.schemas[identifier]) {
      throw new Error (`schema ${identifier} unknown`);
    }

    if (!data) {
      throw new Error (`data is missing`);
    }

    const checked = this.schemas[identifier].validateAsync(data, options);
    return checked;

  } catch (ex) {
    throw ex;
  }

}