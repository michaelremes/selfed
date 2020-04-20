const mongoose = require('mongoose');


const UserResultsSchema = new mongoose.Schema({

  userId: {
    type: String,
    default: ''
  },

  finishedTests: {
    type: Array,
    default: []
  },

  totalPoints: {
    type: Number,
    default: 0
  },


});
module.exports = mongoose.model('UserResults', UserResultsSchema);
