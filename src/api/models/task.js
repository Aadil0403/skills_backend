const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    regNo: {
      type: String,
      required: true,
      unique: true
    },
    domain1: {
      description: {
        type: String,
        url: String,
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
        url: String,
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