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
  // answer: {
  //   type: String,
  //   default: ''
  // },


});


module.exports = mongoose.model('Question', QuestionSchema);
