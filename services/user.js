
module.exports = function ({ mongooseModel, jsonwebtoken, config }) {

  this.config            = config;
  this.model             = mongooseModel;
  this.jsonwebtoken      = jsonwebtoken;
  this.Find              = Find;
  this.FindById          = FindById;
  this.FindByIdAndDelete = FindByIdAndDelete;
  this.FindByIdAndUpdate = FindByIdAndUpdate;
  this.FindOne           = FindOne;
  this.Exists            = Exists;
  this.Create            = Create;
  this.Login             = Login;

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
    const result = await this.model.findByIdAndDelete(id).exec();
    return result;
  } catch (ex) {
    throw ex;
  }
}

// ⚠ does not trigger "save" hook of user model
async function FindByIdAndUpdate (id = null, update = {}, {upsert = false, returnNew = true, select = null} = {}) {
  try {
    let mongooseQuery = this.model.findByIdAndUpdate(id, update, {
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
    const newUser = new this.model(data);
    const result = await newUser.save();
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function Login ({ email, password }) {
  try {

    const user = await this.FindOne({ query : { email }});
    if (!user) { return null; }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) { return null; }
    if (passwordMatch) {
      const token = this.jsonwebtoken.sign({
        id : user._id,
        exp: Math.floor(new Date().getTime()/1000) + this.config.jwt.expiration
      }, this.config.jwt.secret);
      return token;
    }

  } catch (ex) {
    throw ex;
  }
}



