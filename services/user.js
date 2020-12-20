
module.exports = function ({ mongooseModel, joiModel }) {

  this.model  = mongooseModel;
  this.schema = joiModel;

  this.Find              = Find;
  this.FindById          = FindById;
  this.FindByIdAndDelete = FindByIdAndDelete;
  this.FindByIdAndRemove = FindByIdAndRemove;
  this.FindByIdAndUpdate = FindByIdAndUpdate;
  this.FindOne           = FindOne;
  this.FindOneAndDelete  = FindOneAndDelete;
  this.FindOneAndRemove  = FindOneAndRemove;
  this.FindOneAndUpdate  = FindOneAndUpdate;
  this.FindById          = FindById;
  this.Exists            = Exists;
  this.Create            = Create;

}

async function Find ({query = {}, select = null} = {}) {
  try {
    let mongooseQuery = this.model.find(query ? query : {});
    if (select) { mongooseQuery = mongooseQuery.select(select); }
    const result = await mongooseQuery.exec();
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function FindById (id = null, {select = null} = {}) {
  try {
    if (!id) { throw new Error ('id required to get user by id'); }
    let mongooseQuery = this.model.findById(id);
    if (select) { mongooseQuery = mongooseQuery.select(select); }
    const result = await mongooseQuery.exec(); 
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function FindByIdAndDelete (id = null) {
  try {
    if (!id) { throw new Error('id required to delete user by id'); }
    const result = await this.model.findByIdAndDelete(id).exec();
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function FindByIdAndRemove (id = null, {select = null} = {}) {
  try {
    if (!id) { throw new Error('id required to remove user by id'); }
    let mongooseQuery = this.model.findByIdAndRemove(id);
    if (select) { mongooseQuery = mongooseQuery.select(select); }
    const result = await mongooseQuery.exec();
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function FindByIdAndUpdate (id = null, update = {}, {upsert = false, returnNew = true, select = null} = {}) {
  try {
    if (!id) { throw new Error('id required to update user by id'); }
    const validateData = await this.schema.updateUser.validateAsync(update, { stripUnknown : true });
    let mongooseQuery = this.model.findByIdAndUpdate(id, validateData, {
      upsert, new : returnNew
    });
    if (select) { mongooseQuery = mongooseQuery.select(select); }
    const result = await mongooseQuery.exec();
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function FindOne ({query = {}, select = null} = {}) {
  try {
    let mongooseQuery = this.model.findOne(query);
    if (select) { mongooseQuery = mongooseQuery.select(select); }
    const result = await mongooseQuery.exec();
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function FindOneAndDelete ({ query = {}} = {}) {
  try {
    const result = await this.model.findOneAndDelete(query).exec();
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function FindOneAndRemove ({ query = {}, select = null } = {}) {
  try {
    let mongooseQuery = this.model.findOneAndRemove(query);
    if (select) { mongooseQuery = mongooseQuery.select(select); }
    const result = await mongooseQuery.exec();
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function FindOneAndUpdate ({query = {}, upsert = false, returnNew = true, select = null} = {}, update = {}) {
  try {
    const validateData = await this.schema.updateUser.validateAsync(update, { stripUnknown : true });
    let mongooseQuery = this.model.findOneAndUpdate(query, validateData, {
      upsert, new : returnNew
    });
    if (select) { mongooseQuery = mongooseQuery.select(select); }
    const result = await mongooseQuery.exec();
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function Exists (query = {}) {
  try {
    const result = await this.model.exists(query);
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function Create (data) {
  try {
    const validateData = await this.schema.createUser.validateAsync(data, { stripUnknown : true });
    const newUser = new this.model(validateData);
    const result = await newUser.save();
    return result;
  } catch (ex) {
    throw ex;
  }
}

