import React from "react";
import { Carousel } from "react-bootstrap";

export default function CustomCarousel() {
  return (
    <div
      style={{
        width: "90%",
        margin: "20px auto", // Add 20px margin on top and bottom, and auto margin on left and right
        margin: "40px",
        maxWidth: "1920px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add drop shadow
      }}

      className="mt-10 mx-auto"
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block h-[220px] md:h-[750px] w-full"
            src="https://wallpaperaccess.com/full/5912737.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block h-[220px] md:h-[750px] w-full"
            src="https://free4kwallpapers.com/uploads/originals/2015/05/04/pasta-plate.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block h-[220px] md:h-[750px] w-full"
            src="https://wallpaperaccess.com/full/8300573.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
