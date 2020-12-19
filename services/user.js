
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
  let mongooseQuery = this.model.find(query ? query : {});
  if (select) { mongooseQuery = mongooseQuery.select(select); }
  return await mongooseQuery.exec();
}

async function FindById (id = null, {select = null} = {}) {
  if (!id) { throw new Error ('id required for FindById method'); }
  let mongooseQuery = this.model.findById(id);
  if (select) { mongooseQuery = mongooseQuery.select(select); }
  return await mongooseQuery.exec();
}

async function FindByIdAndDelete (id = null) {
  if (!id) { throw new Error('id required for FindByIdAndDelete method'); }
  return await this.model.findByIdAndDelete(id).exec();
}

async function FindByIdAndRemove (id = null, {select = null} = {}) {
  if (!id) { throw new Error('id required for FindByIdAndRemove method'); }
  let mongooseQuery = this.model.findByIdAndRemove(id);
  if (select) { mongooseQuery = mongooseQuery.select(select); }
  return await mongooseQuery.exec();
}

async function FindByIdAndUpdate (id = null, update = {}, {upsert = false, returnNew = true, select = null} = {}) {
  if (!id) { throw new Error('id required for FindByIdAndUpdate method'); }
  const validateData = await this.schema.updateUser.validateAsync(update, { stripUnknown : true });
  let mongooseQuery = this.model.findByIdAndUpdate(id, validateData, {
    upsert, new : returnNew
  });
  if (select) { mongooseQuery = mongooseQuery.select(select); }
  return await mongooseQuery.exec();
}

async function FindOne ({query = {}, select = null} = {}) {
  let mongooseQuery = this.model.findOne(query);
  if (select) { mongooseQuery = mongooseQuery.select(select); }
  return await mongooseQuery.exec();
}

async function FindOneAndDelete ({ query = {}} = {}) {
  return await this.model.findOneAndDelete(query).exec();
}

async function FindOneAndRemove ({ query = {}, select = null } = {}) {
  let mongooseQuery = this.model.findOneAndRemove(query);
  if (select) { mongooseQuery = mongooseQuery.select(select); }
  return await mongooseQuery.exec();
}

async function FindOneAndUpdate ({query = {}, upsert = false, returnNew = true, select = null} = {}, update = {}) {
  const validateData = await this.schema.updateUser.validateAsync(update, { stripUnknown : true });
  let mongooseQuery = this.model.findOneAndUpdate(query, validateData, {
    upsert, new : returnNew
  });
  if (select) { mongooseQuery = mongooseQuery.select(select); }
  return await mongooseQuery.exec();
}

async function Exists (query = {}) {
  return await this.model.exists(query);
}

async function Create (data) {
  const validateData = await this.schema.createUser.validateAsync(data, { stripUnknown : true });
  const newUser = new this.model(validateData);
  return await newUser.save();
}

