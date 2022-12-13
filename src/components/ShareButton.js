import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

const threeSeconds = 3000;
const copy = require('clipboard-copy');

function ShareButton({ type, id }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    copy(`http://localhost:3000/${type}/${id}`);
  };
  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, threeSeconds);
    }
  }, [clicked]);
  return (
    <button
      type="button"
      onClick={ () => handleClick() }
    >
      {clicked ? 'Link copied!' : <img
        data-testid="share-btn"
        src={ ShareIcon }
        alt="share icon"
      />}
    </button>
  );
}

ShareButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ShareButton;
