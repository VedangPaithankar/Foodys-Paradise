import React from "react";
import './Footer.css';

export default function Footer() {
  return (
    <div className="custom-footer py-10 custom-font">
      <footer className="container text-white text-center text-lg-start">
        {/* Footer content */}
        <div className="d-lg-flex justify-content-between align-items-center px-4">
          {/* Image on the left */}
          <div className="md:d-flex align-items-center footer-content">
            <img
              src="/Assets/Logo.svg"
              alt="Foodys Paradise Logo"
              className="md:mr-20 h-[30px] md:h-[100px] footer-logo"
            />
            <div className="ms-3 text-lg footer-text text-justify">
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
