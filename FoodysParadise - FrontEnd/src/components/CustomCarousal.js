import React from "react";
import { Carousel } from "react-bootstrap";

export default function CustomCarousel() {
  return (
    <div
      style={{
        width: "90%",
        margin: "20px auto", // Add 20px margin on top and bottom, and auto margin on left and right
        //margin: "40px",
        maxWidth: "1920px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add drop shadow
      }}

      className="mt-10 mx-auto"
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block h-[220px] md:h-[750px] w-full object-cover"
            src="https://wallpaperaccess.com/full/5912737.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block h-[220px] md:h-[750px] w-full object-cover"
            src="https://img.freepik.com/premium-photo/juicy-burger-board-black-background-dark-background-fast-food-traditional-american-food-copy-space_124865-6813.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block h-[220px] md:h-[750px] w-full object-cover"
            src="https://wallpaperaccess.com/full/8300573.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
