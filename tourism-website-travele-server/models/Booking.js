const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  tourName:{
    type: String,
    required: true,
  },
    imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
