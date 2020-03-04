const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },

});


module.exports = mongoose.model('Test', TestSchema);
