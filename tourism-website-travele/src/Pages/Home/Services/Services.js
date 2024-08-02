import React from 'react';
import "./Services.css";
import Services1 from "../../../Images/Services/1a.jpg";
import Services2 from "../../../Images/Services/2a.jpg";
import Services3 from "../../../Images/Services/3a.jpg";
import Services4 from "../../../Images/Services/4a.jpg";

const Services = () => {
  return (
    <section>
      <div className="text">
        <h2>We have the best services available for you!</h2>
      </div>
      <div class="rowitems">
        <div class="container-box">
        <div class="container-image">
           <img src={Services1} alt="Flight Services"/>
        </div>
            <h4>Flight Services</h4>
            <p>Arrival and Departure</p>
        </div>
    
        <div class="container-box">
        <div class="container-image">
           <img src={Services2} alt="Food Services"/>
        </div>
            <h4>Food Services</h4>
            <p>Catering</p>
        </div>

        <div class="container-box">
        <div class="container-image">
            <img src={Services3} alt="Travel Services"/>
        </div>
            <h4>Travel Services</h4>
            <p>Pick-up/drop</p>
        </div>

        <div class="container-box">
        <div class="container-image">
            <img src={Services4} alt="Hotel Services"/>
        </div>
            <h4>Hotel Services</h4>
            <p>Check-in/out</p>
        </div>

    </div>
  </section>
  );
};

export default Services;