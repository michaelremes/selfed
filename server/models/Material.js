
const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },

});


module.exports = mongoose.model('Material', MaterialSchema);
