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
  correctAnswers: {
    type: Array,
    default: []
  },
});


module.exports = mongoose.model('Question', QuestionSchema);
