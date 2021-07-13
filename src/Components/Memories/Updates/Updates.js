import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const Updates = ({ update }) => {
  return (
    <Carousel>
      <div>
        <h5>{update._id}</h5>
      </div>
    </Carousel>
  );
};

export default Updates;
