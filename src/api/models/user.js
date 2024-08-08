const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    regNo: {
      type: Number,
      required: true,
      unique: true
    },
    phNo: {
      type: Number,
      required: true,
      minlength: 10,
      maxLength: 10,
      match: /^\d{10}$/ // Ensure only 10 digits
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
module.exports = USERS;