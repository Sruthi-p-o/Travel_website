//tour.js

const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

