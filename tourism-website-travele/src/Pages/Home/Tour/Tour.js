import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Tour.css";

const Tour = (props) => {
  const { _id, name, price, pic, details, duration } = props.tour;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [destination, setDestination] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handlePhotoURLChange = (event) => {
    setImageURL(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const reviewData = {
      rating: rating,
      reviewText: review,
      destination: destination,
      imageUrl: imageURL
    };

    // Send review data to the backend
    fetch("http://localhost:5000/addReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Review submitted successfully:", data);
      // Optionally, you can handle success (e.g., show a confirmation message)
      alert("Review added successfully!");
    })
    .catch(error => {
      console.error("Error submitting review:", error);
      // Optionally, you can handle errors (e.g., show an error message)
      alert("Error adding review. Please try again later.");
    });

    // Reset form
    setRating(0);
    setReview("");
    setDestination("");
    setImageURL("");
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card">
        <img src={pic} className="card-img-top" alt="..." height="200" />
        <div className="card-body">
          <h4 className="card-title text-center">{name}</h4>
          <p>{details.substr(0, 120)}</p>
          <h6 className="mb-3">
            <i className="fas fa-clock blue-color"></i> Duration: {duration} days
          </h6>
          <h6 className="mb-3">
            <i className="fas fa-hand-holding-usd blue-color"></i> Cost: ₹{price} /person
          </h6>
          <Link to={`/tour/${_id}`} className="text-decoration-none">
            <button className="btn d-block mx-auto">Book</button>
          </Link>
        </div>
      </div>
      <div className="review-section mt-4">
        <h5 className="text text-center">Add a Review</h5>
        <form onSubmit={handleSubmit}>
          <div className="rating mb-3">
            {[...Array(5)].map((star, index) => (
              <span
                key={index}
                className={index < rating ? "star filled" : "star"}
                onClick={() => handleRatingChange(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write your review here..."
              value={review}
              onChange={handleReviewChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter the destination You visited"
              value={destination}
              onChange={handleDestinationChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter image URL"
              value={imageURL}
              onChange={handlePhotoURLChange}
            />
          </div>
          <button type="submit" className="btn btn-primary d-block mx-auto">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tour;
