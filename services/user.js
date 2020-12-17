const { user : User } = require('../models').mongoose;

module.exports = function () {

  this.Create = Create;
  this.Find = Find;
  this.Update = Update;
  this.Delete = Delete;
  this.Login = Login;
  
}

async function Create (userInput) {

  const newUser = new User(userInput);
  return await newUser.save();

}

async function Find (query) {

  return await User.find(query).exec();

}

async function Update (userInput) {

}

async function Delete (userInput) {

}

async function Login (userInput) {

}