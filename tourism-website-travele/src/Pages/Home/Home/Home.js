import React from "react";
import Banner from "../Banner/Banner";
import Gallery from "../Gallery/Gallery";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div className="body">
      <Banner></Banner>
      <Services></Services>
      <Gallery></Gallery>
    </div>
  );
};

export default Home;
