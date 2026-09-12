import React from "react";
import Logo from '../assets/Logo.webp';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row md:items-center gap-6">
        <img
          src={Logo}
          alt="Foodys Paradise"
          className="h-20 md:h-24 shrink-0"
        />
        <div className="font-sans text-sm md:text-base leading-relaxed text-paper/90">
          <p>
            Welcome to Foodys Paradise, your ultimate destination for
            mouthwatering recipes and culinary inspiration. Whether you're a
            seasoned chef or a novice cook, it's designed to cater to all your
            gastronomic needs -- helping you create delectable dishes from the
            comfort of your own kitchen.
          </p>
          <p className="mt-4 font-serif italic text-saffron">
            &mdash; Vedang Paithankar
          </p>
        </div>
      </div>
    </footer>
  );
}
