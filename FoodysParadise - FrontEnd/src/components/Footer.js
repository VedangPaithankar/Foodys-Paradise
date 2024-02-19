import React from "react";
import Logo from '../assets/Logo.webp';

export default function Footer() {
  return (
    <div className="bg-[#121212] py-10 custom-font">
      <footer className="container text-white text-center lg:text-left">
        <div className="lg:flex lg:justify-between lg:items-center px-4">
          <div className="flex items-center">
            <img
              src={Logo}
              alt="Foodys Paradise Logo"
              className="mr-8 h-24 md:h-[50px] lg:h-32"
            />
            <div className="text-sm md:text-lg lg:text-left">
              <p className="text-justify">
                Welcome to Foodys Paradise, your ultimate destination for
                mouthwatering recipes and culinary inspiration! Whether
                you're a seasoned chef or a novice cook, our recipe website is
                designed to cater to all your gastronomic needs, helping you
                create delectable dishes from the comfort of your own kitchen. 
                <br />
                <br />
                <span className="text-right">
                - Vedang Paithankar :)
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
