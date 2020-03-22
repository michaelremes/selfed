
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

});


module.exports = mongoose.model('Test', TestSchema);
