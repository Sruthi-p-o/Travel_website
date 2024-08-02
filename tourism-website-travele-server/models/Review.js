// models/Review.js

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
