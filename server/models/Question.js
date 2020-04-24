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
  answers: {
    type: Array,
    default: []
  },
  textAnswer: {
    type: String,
    default: ''
  }

});


module.exports = mongoose.model('Question', QuestionSchema);
