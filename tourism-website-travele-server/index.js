// index.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://singaporemail73:TE7D3Mq5ffFy8lTR@cluster0.zzzhqpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Connect to the database
connect();

// Import models
const Tour = require("./models/Tour");
const Booking = require("./models/Booking");
const Review = require("./models/Review"); 

// Get all tours
app.get("/tours", async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.json(tours);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get tour by id
app.get("/tour/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.send(tour);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add tour
app.post("/addTour", async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const result = await newTour.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add booking
app.post("/addBooking", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const result = await newBooking.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add review
app.post("/addReview", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const result = await newReview.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all bookings
app.get("/allBookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get my bookings
app.get("/myBookings/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.params.email });
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update booking status
app.put("/bookings/:id", async (req, res) => {
  try {
    const update = { status: "success" };
    const result = await Booking.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete booking
app.delete("/deleteBooking/:id", async (req, res) => {
  try {
    const result = await Booking.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all reviews
app.get("/allReviews", async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Server home
app.get("/", (req, res) => {
  res.send("Tourism server home");
});

app.listen(port, () => {
  console.log("Listening to port ", port);
});
