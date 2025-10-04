/**
 * User Model
 * Defines the schema for users, including authentication, profile, and role information.
 */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// This is our User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please tell us your name.'] },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Please give us your username'],
  },
  photo: {
    type: String,
    default: 'uploads/defaults/default.jpg',
  },
  photoPath: String,
  role: {
    type: String,
    enum: {
      values: ['user', 'host'],
      message: 'Role is either user or host',
    },
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password must be at least 8 characters long'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Password should match',
    },
  },
});

// this is for the password encryption
// We use the document middleware to encrypt our password
// right before we save or create our document
userSchema.pre('save', async function (next) {
  // only run if the password was actually modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 12);
    // reset the password confirm to undefined
    this.passwordConfirm = undefined;
    next();
  } catch (err) {
    next(err);
  }
});

// Static/Instance method for password comparison

// --------- Explain it well
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// This is our User Model
const User = mongoose.model('User', userSchema);
module.exports = User;
