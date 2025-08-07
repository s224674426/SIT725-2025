const mongoose = require('mongoose');

const socketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  accessibility: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Socket', socketSchema);

