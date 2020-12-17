const { Schema, model }  = require('mongoose');

const UserSchema = new Schema ({
  email: { type: String, required: true, unique: true}
}, {
  timestamps: true
});

module.exports = model('User', UserSchema);