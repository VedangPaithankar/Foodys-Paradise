import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div className="flex align-items-center custom-font">
      <Link className="nav-brand ml-5 mt-3 w-20 h-20 mb-3" to="/">
        <img src="/Assets/Logo.svg" alt="" />
      </Link>
      <Link className="ml-5 text-black" to="/">
        {props.title}
      </Link>
      <ul className="nav nav-underline ml-auto mr-10">
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