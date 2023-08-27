import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`flex align-items-center custom-font navbar ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-brand ml-5 mt-3 w-20 h-20 mb-3">
        <img src="/Assets/Logo.svg" alt="" />
      </div>
      <Link className={`ml-2 text-black ${menuOpen ? 'hidden' : ''}`} to="/">
        {props.title}
      </Link>
      <button className="menu-icon ml-auto mr-4" onClick={toggleMenu}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </button>
      <ul className={`nav nav-underline ${menuOpen ? 'mobile-menu' : 'hidden'}`}>
        <li className="nav-item">
          <Link className="nav-link text-black" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-black" to="/search">
            Search
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-black" to="/myfridge">
            My Fridge
          </Link>
        </li>
      </ul>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
};
