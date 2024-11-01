const mongoose = require('mongoose');


const UserResultsSchema = new mongoose.Schema({

  username: {
    type: String,
    default: ''
  },

  finishedTest: {
    type: Object,
    default: null
  },

  totalPoints: {
    type: Number,
    default: 0
  },

  date: {
    type: String,
    default: ''
  },


});
module.exports = mongoose.model('UserResults', UserResultsSchema);
