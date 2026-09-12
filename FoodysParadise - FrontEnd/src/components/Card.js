import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ title, image }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-lg transition-shadow">
      <img
        src={image}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        alt={title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <h3 className="absolute bottom-4 left-4 right-4 font-serif font-semibold text-white text-lg">
        {title}
      </h3>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
};
