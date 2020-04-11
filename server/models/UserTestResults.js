const mongoose = require('mongoose');


const UserTestResultsSchema = new mongoose.Schema({
  username: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  answeredQuestions: {
    type: Array,
    default: []
  }

});
module.exports = mongoose.model('UserTestResults', UserTestResultsSchema);
