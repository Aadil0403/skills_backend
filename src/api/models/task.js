const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    regNo: {
      type: String,
      required: true,
      unique: true
    },
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    domain1: {
      description: {
        type: String,
        required: true
      },
      drive: {
        type: String,
        default: ""
      },
      week0:{
        isCompleted: {
          type: Boolean,
          default: false
        }
      },
      week1:{
        isCompleted: {
          type: Boolean,
          default: false
        }
      },
      week2:{isCompleted: {
        type: Boolean,
        default: false
      }},
      week3:{isCompleted: {
        type: Boolean,
        default: false
      }},
    },
    domain2: {
      description: {
        type: String,
        required: true
      },
      drive: {
        type: String,
        default: ""
      },
      week0:{
        isCompleted: {
          type: Boolean,
          default: false
        }
      },
      week1:{
        isCompleted: {
          type: Boolean,
          default: false
        }
      },
      week2:{isCompleted: {
        type: Boolean,
        default: false
      }},
      week3:{isCompleted: {
        type: Boolean,
        default: false
      }},
    },
  })

  const TASKS = mongoose.model('Task', taskSchema);
  module.exports = TASKS