// Card.js
import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
  return (
    <div className="card-image custom-font w-72 h-72 m-2">
      <div className="box-wrapper w-full h-3/4 rounded-lg overflow-hidden">
        <img
          src={props.image}
          className="w-full h-full object-cover transition-transform transform hover:scale-105 card-image"
          alt=""
        />
      </div>
      <div className="text-center mt-2">
        <h5 className="card-title">{props.title}</h5>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
};