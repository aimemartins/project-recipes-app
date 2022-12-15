import { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import '../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      }]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavRecipes(favoriteRecipes);
    setFilterRecipes(favoriteRecipes);
  }, []);
  return (
    <div style={ { background: '#faf6ed', height: '100vh' } }>
      <Header title="Favorite Recipes" />
      <div className="fav-btns-container">
        <button
          type="submit"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterRecipes(favRecipes) }
        >
          All
        </button>
        <button
          type="submit"
          data-testid="filter-by-meal-btn"
          onClick={ () => {
            setFilterRecipes(favRecipes
              .filter(({ type }) => type === 'meal'));
          } }
        >
          Meals
        </button>
        <button
          type="submit"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setFilterRecipes(favRecipes
              .filter(({ type }) => type === 'drink'));
          } }
        >
          Drinks
        </button>
      </div>
      <FavoriteCard recipes={ filterRecipes } setFavRecipes={ setFilterRecipes } />
    </div>
  );
}

export default FavoriteRecipes;
