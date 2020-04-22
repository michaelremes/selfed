const mongoose = require('mongoose');


const UserResultsSchema = new mongoose.Schema({

  userId: {
    type: String,
    default: ''
  },

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


});
module.exports = mongoose.model('UserResults', UserResultsSchema);
