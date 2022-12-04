import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import notFav from '../images/whiteHeartIcon.svg';
import fav from '../images/blackHeartIcon.svg';

function FavoriteButton({ recipe, id, type }) {
  const [favRecipes, setFavRecipes] = useState([]);
  const [isFav, setIsFav] = useState();
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const findFav = favoriteRecipes.some((favRecipe) => favRecipe.id === id);
    setIsFav(findFav);
    setFavRecipes(favoriteRecipes);
  }, []);

  const handleClick = () => {
    const foodType = type === 'meals' ? 'Meal' : 'Drink';
    const newFav = {
      id,
      type: type.split('s')[0],
      nationality: recipe[type][0].strArea === undefined ? '' : recipe[type][0].strArea,
      category: recipe[type][0].strCategory,
      alcoholicOrNot: recipe[type][0].strAlcoholic === undefined ? ''
        : recipe[type][0].strAlcoholic,
      name: recipe[type][0][`str${foodType}`],
      image: recipe[type][0][`str${foodType}Thumb`],
      // tags: recipe[type][0].strTags.includes(',')
      //   ? [...recipe[type][0].strTags.split(',')] : [...recipe[type][0].strTags],
    };
    if (!isFav) {
      const newFavRecipes = [...favRecipes, newFav];
      setIsFav(true);
      setFavRecipes(newFavRecipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    } else {
      setIsFav(false);
      const newFavRecipes = favRecipes.filter((favRecipe) => favRecipe.id !== id);
      setFavRecipes(newFavRecipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    }
  };
  return (
    <button
      type="button"
      onClick={ () => handleClick() }
    >
      <img
        src={ isFav ? fav : notFav }
        alt="favorite icon"
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  recipe: PropTypes.shape().isRequired,
};

export default FavoriteButton;
