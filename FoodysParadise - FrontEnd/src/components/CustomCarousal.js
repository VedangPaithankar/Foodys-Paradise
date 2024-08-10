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
            src="https://images.unsplash.com/photo-1703848987117-0bd6015474b7?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
