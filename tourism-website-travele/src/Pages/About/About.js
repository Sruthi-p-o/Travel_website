import React from "react";
import about from "../../Images/about/about.jpg";
import "./About.css";

const About = () => {
  return (
    <div className="aboutbody">
      <h1 className="head text-center">About Us</h1>
      <div className="container overflow-hidden">
        <div className="row g-4">
          <div className="col-12 col-md ">
            <img className=" align-items-center" src={about} alt="" height="auto" />
          </div>
        </div>
      </div>

      <div className="container my-5 d-flex flex-column align-items-center">
        <h2 className="span">WHO WE ARE!</h2>
        <h3 className="w-75 text-center">
          <div className="text">We’ve been creating life changing travel experiences. Our group tours are designed to help you connect, explore, taste and give back to the world, all whilst making a new crew of mates along the way. So you can relax
          and enjoy the absolute best of every destination we visit</div>
        </h3>
        <h3 className="span text-center blue-color mt-4">Visit us</h3>
        <p className="text">
          <i className="blue-color fas fa-location-arrow"></i> Travel
        </p>
        <p className="text">
          <i className="blue-color fas fa-phone"></i> +91 9874563210
        </p>
      </div>
    </div>
  );
};

export default About;
