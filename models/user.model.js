const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email is not valid',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getName = function () {
  return this.name;
};

module.exports = mongoose.model('User', UserSchema);
