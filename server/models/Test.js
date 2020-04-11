
const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  questions: {
    type: Array,
    default: []
  },
  deadline: {
    type: Date,
    default: ''
  },
  active: {
    type: Boolean,
    default: true
  },

});


module.exports = mongoose.model('Test', TestSchema);
