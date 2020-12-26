const { Schema, model }  = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new Schema ({
  email: { type: String, required: true, unique: true},
  password : { type: String, required: true },
  username : { type: String, required: true }
}, {
  timestamps: true
});

UserSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function (err, salt) {
     if (err) { return next(err); }
     bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        return next();
     });
  });
});

UserSchema.pre('findOneAndUpdate', function (next) {
  if (this._update.password) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(this._update.password, salt, (err, hash) => {
        if (err) { return next(err); }
        console.log(hash)
        this._update.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) { return reject(err); }
      return resolve(isMatch);
    });
  });
};

module.exports = model('User', UserSchema);