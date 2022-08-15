const mongoose = require('mongoose');

const companyScheme = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true
  },
  isMain: {
    type: Boolean,
    default: false,
  }
});

mongoose.model('Companies', companyScheme);
