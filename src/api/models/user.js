const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    regNo: {
      type: Number,
      required: true,
      unique: true
    },
    phNo: {
      type: Number,
      required: true,
      maxLength: 10,
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  });

const USERS = mongoose.model('User', userSchema);
module.exports = USERS