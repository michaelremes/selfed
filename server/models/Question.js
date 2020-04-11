const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  task: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  answer: {
    type: String,
    default: ''
  },
  points: {
    type: Number,
    default: 0
  }

});


module.exports = mongoose.model('Question', QuestionSchema);
