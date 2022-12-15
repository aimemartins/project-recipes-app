import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

const threeSeconds = 3000;
function RecipeCard({ recipe, index }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    navigator.clipboard.writeText(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
  };
  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, threeSeconds);
    }
  }, [clicked]);
  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        margin: '10%',
      } }
    >
      {/* <Link to={ `${recipe.type}s/${recipe.id}` }>
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
      ))} */}
      <Card
        style={ {
          width: '18rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
        } }
      >
        <Link
          to={ `${recipe.type}s/${recipe.id}` }
          style={ { height: '250px', width: '100%' } }
        >
          <Card.Img
            variant="top"
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt={ recipe.image }
          />
          <Card.Title
            data-testid={ `${index}-horizontal-name` }
            style={ { color: 'rgb(81, 21, 23)', fontFamily: ['Arial'] } }
          >
            {recipe.name}

          </Card.Title>
        </Link>
        <Card.Body>
          <Card.Text>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.nationality !== '' ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot} - ${recipe.category}`}

            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            {recipe.tags.map((tag) => (
              <p
                key={ `${tag}-${index}` }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}

              </p>
            ))}
          </Card.Text>
          <Button
            variant="primary"
            onClick={ () => handleClick() }
            style={ { backgroundColor: 'rgb(187, 88, 21)' } }
          >
            {clicked ? 'Link copied!' : <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ ShareIcon }
              alt="share icon"
            />}

          </Button>
        </Card.Body>
      </Card>
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
