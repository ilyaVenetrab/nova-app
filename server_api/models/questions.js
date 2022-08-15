const mongoose = require('mongoose');

const questionScheme = new mongoose.Schema({
  revertButton: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true
  },
  refresh: {
    type: Boolean,
    default: false,
  }
});

mongoose.model('Questions', questionScheme);
