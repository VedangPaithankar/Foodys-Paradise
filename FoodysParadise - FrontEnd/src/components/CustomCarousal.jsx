import React from "react";
import { Carousel } from "react-bootstrap";

export default function CustomCarousel() {
  return (
    <div
      style={{
        width: "90%",
        margin: "20px auto", // Add 20px margin on top and bottom, and auto margin on left and right
        maxWidth: "1920px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add drop shadow
      }}
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wallpaperaccess.com/full/5912737.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://free4kwallpapers.com/uploads/originals/2015/05/04/pasta-plate.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wallpaperaccess.com/full/8300573.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
