import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ recipes, setFavRecipes }) {
  const [btnClick, setBtnClick] = useState(false);
  const shareBtn = () => {
    setBtnClick(true);
    navigator.clipboard.writeText(`http://localhost:3000/${recipes[0].type}s/${recipes[0].id}`);
  };

  const deleteFav = (id) => {
    const newRecipe = recipes.filter((e) => e.id !== id);
    setFavRecipes(newRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipe));
  };

  return (
    <div>
      {recipes.map((element, index) => (
        <div
          key={ element.id }
        >
          <Link to={ `${element.type}s/${element.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ element.image }
              alt="mealImg"
              style={ { width: '100px' } }
            />
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {element.name}
            </p>
          </Link>
          { element.alcoholicOrNot === ''
            ? (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${element.nationality} - ${element.category}`}
              </p>
            ) : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {element.alcoholicOrNot}
              </p>
            )}
          <button
            type="submit"
            onClick={ () => shareBtn() }
          >
            { btnClick === true ? 'Link copied!'
              : (
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="shareImg"
                />)}
          </button>
          <button
            type="submit"
            onClick={ () => deleteFav(element.id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="favImg"
            />
          </button>
        </div>
      ))}
    </div>
  );
}

FavoriteCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  setFavRecipes: PropTypes.func.isRequired,
};

export default FavoriteCard;
