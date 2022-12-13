import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

const threeSeconds = 3000;
const copy = require('clipboard-copy');

function RecipeCard({ recipe, index }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
  };
  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, threeSeconds);
    }
  }, [clicked]);
  return (
    <div>
      <Link to={ `${recipe.type}s/${recipe.id}` }>
        <img
          style={ { width: '40px', height: '40px' } }
          src={ recipe.image }
          alt={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {recipe.nationality !== '' ? `${recipe.nationality} - ${recipe.category}`
          : `${recipe.alcoholicOrNot} - ${recipe.category}`}

      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      <button
        type="button"
        onClick={ () => handleClick() }
      >
        {clicked ? 'Link copied!' : <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ ShareIcon }
          alt="share icon"
        />}
      </button>
      {recipe.tags.map((tag) => (
        <p
          key={ `${tag}-${index}` }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}

        </p>
      ))}
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
