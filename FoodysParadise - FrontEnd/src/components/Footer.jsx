import React from "react";

export default function Footer() {
  return (
    <div className="custom-footer py-10">
      <footer className="container text-white text-center text-lg-start">
        {/* Footer content */}
        <div className="d-lg-flex justify-content-between align-items-center px-4">
          {/* Image on the left */}
          <div className="d-flex align-items-center">
            <img
              src="/Assets/Logo.svg" // Replace with the correct path to your logo image
              alt="Foodys Paradise Logo"
              style={{ width: "300px", height: "300px" }} // Adjust the size as needed
              className="mr-20"
            />
            <div className="ms-3 text-center text-lg custom-font-white">
              <p>
                Welcome to Foodys Paradise, your ultimate destination for
                mouthwatering recipes and culinary inspiration! At Foodys
                Paradise, we believe that food is not just a necessity but a
                delightful experience that brings people together. Whether
                you're a seasoned chef or a novice cook, our recipe website is
                designed to cater to all your gastronomic needs, helping you
                create delectable dishes from the comfort of your own kitchen. - Vedang Paithankar :)
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
