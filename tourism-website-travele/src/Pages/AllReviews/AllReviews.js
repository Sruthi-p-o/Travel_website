import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "./AllReviews.css";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("none");

  useEffect(() => {
    fetch("http://localhost:5000/allReviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, []);

  // Function to generate star icons based on rating
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="filled">★</span>);
      } else {
        stars.push(<span key={i}>★</span>);
      }
    }
    return stars;
  };

  // Function to handle sorting
  const handleSort = (reviews, type) => {
    if (type === "lowToHigh") {
      return [...reviews].sort((a, b) => a.rating - b.rating);
    } else if (type === "highToLow") {
      return [...reviews].sort((a, b) => b.rating - a.rating);
    } else {
      return reviews;
    }
  };

  // Filter and sort reviews based on search term and sort type
  const filteredAndSortedReviews = handleSort(
    reviews.filter((review) =>
      review.destination.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortType
  );

  return (
    <div className="body">
      <div className="my-5 black-bg"> {/* Add black-bg class */}
        <h2 className="text1 text-center">All Reviews</h2>
        <div className="container">
          <div className="row g-3 mb-3">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search by destination"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="none">Sort by rating</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>
          <div className="row g-3 mt-3">
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              filteredAndSortedReviews.map((review) => (
                <div key={review._id} className="col-12 col-md-6 col-lg-4">
                  <div className="card">
                    <div className="crd card-body">
                      <h5 className="text1 card-title">Ratings:</h5>
                      <p className="card-text">
                        {generateStars(review.rating)}
                      </p>
                      <h5 className="text1 card-title">Destination:</h5>
                      <p className="text2 card-text">{review.destination}</p>
                      <h5 className="text1 card-title">Review:</h5>
                      <p className="text2 card-text">{review.reviewText}</p>
                      <h5 className="text1 card-title">Image:</h5>
                      <img src={review.imageUrl} alt="review" style={{ width: '380px', height: '300px' }} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
