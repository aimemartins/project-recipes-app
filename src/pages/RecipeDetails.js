import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

const maxRecommendation = 6;

function RecipeDetails() {
  const [recipe, setRecipe] = useState('');
  const [recommend, setRecommend] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [progress, setProgress] = useState({});
  const history = useHistory();
  const arrLoc = history.location.pathname.split('/');
  const type = arrLoc[1];
  const { id } = useParams();
  console.log(progress);
  useEffect(() => {
    const getDrink = async (idRecipe) => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      await setRecipe(result);
    };

    const getMeal = async (idRecipe) => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      // console.log(result);
      await setRecipe(result);
    };

    const getDrinkRecommend = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const fetchTheMeal = await fetch(endpoint);
      const meals = await fetchTheMeal.json();
      const maxMeals = meals.meals.length <= maxRecommendation
        ? meals.meals : meals.meals.slice(0, maxRecommendation);
      await setRecommend(maxMeals);
    };

    const getMealRecommend = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const fetchTheDrink = await fetch(endpoint);
      const drinks = await fetchTheDrink.json();
      const maxDrinks = drinks.drinks.length <= maxRecommendation
        ? drinks.drinks : drinks.drinks.slice(0, maxRecommendation);
      await setRecommend(maxDrinks);
    };

    if (type === 'meals') {
      getMeal(id);
      getMealRecommend();
    } else {
      getDrink(id);
      getDrinkRecommend();
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        {
          drinks: {
            178319: [],
          },
          meals: {
            52771: [],
          },
        },
      ));
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setProgress(inProgressRecipes);
    setInProgress(Object.keys(inProgressRecipes[type]).includes(id));
  }, []);
  if (recipe !== '') {
    const keys = Object.keys(recipe[type][0]);
    const ingredients = keys.filter((key) => key.includes('Ingredient'));
    const measures = keys.filter((key) => key.includes('Measure'));
    const video = (
      <video data-testid="video" max-width="750" max-height="500" controls>
        <track default kind="captions" />
        <source src={ recipe[type][0].strYoutube } type="video/mp4" />
      </video>
      // <iframe
      //   width="420"
      //   height="315"
      //   src={ recipe[type][0].strYoutube }
      //   title="video"
      // />
    );
    return (
      <>
        <img
          src={ type === 'meals'
            ? recipe.meals[0].strMealThumb
            : recipe.drinks[0].strDrinkThumb }
          alt="recipe"
          width="50px"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">
          {type === 'meals' ? recipe.meals[0].strMeal : recipe.drinks[0].strDrink}
        </h1>
        <h3 data-testid="recipe-category">
          {recipe[type][0].strCategory}
          {' '}
          {type === 'drinks' ? recipe[type][0].strAlcoholic : ''}
        </h3>
        <ul>
          {ingredients.map((i, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {recipe[type][0][i]}
              {' '}
              {recipe[type][0][measures[index]]}
            </li>
          ))}
        </ul>
        <p data-testid="instructions">
          {recipe[type][0].strInstructions}
        </p>
        {type === 'meals' && recipe[type][0].strYoutube !== '' ? video : ''}
        {recommend.length !== 0 && <Carousel recommend={ recommend } category={ type } />}
        <ShareButton type={ type } id={ id } />
        <FavoriteButton recipe={ recipe } id={ id } type={ type } />
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { bottom: '0px', position: 'fixed' } }
          onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
        >
          {inProgress ? 'Continue Recipe' : 'Start recipe'}
        </button>
      </>
    );
  }
}

export default RecipeDetails;
