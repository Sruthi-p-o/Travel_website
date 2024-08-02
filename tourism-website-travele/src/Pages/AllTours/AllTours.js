import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Tour from "../Home/Tour/Tour";

const AllTours = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/tours")
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="body my-5">
      <h2 className="text-center blue-color">
        <i className="fas fa-flask"></i> Our Upcoming Tours
      </h2>
      <p className=" text text-center fs-5">We try to provide the best experience possible. We prefer quality over anything.</p>
      <div className="container">
        <div className="row g-3">
          {isLoading ? ( // Check if it is loading
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            tours.map((tour) => <Tour key={tour._id} tour={tour}></Tour>)
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTours;
