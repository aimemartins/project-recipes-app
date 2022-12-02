import React, { useState, useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom';
// import { theCocktailDBName } from '../services/theCocktailDB';
// import { theMealDBName } from '../services/theMealDB';
// import { getDrink } from "../services/theCocktailDB";
// import { getMeal } from "../services/theMealDB";

function RecipeDetails() {
  const [recipe, setRecipe] = useState('');
  const [recomend, setRecomend] = useState('');
  const history = useHistory();
  const arrLoc = history.location.pathname.split('/');
  const type = arrLoc[1];
  const { id } = useParams();

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
      await setRecipe(result);
    };

    const getDrinkRecomend = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const fetchTheMeal = await fetch(endpoint);
      const meals = await fetchTheMeal.json();
      await setRecomend(meals);
    };

    const getMealRecomend = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const fetchTheDrink = await fetch(endpoint);
      const drinks = await fetchTheDrink.json();
      await setRecomend(drinks);
    };

    if (type === 'meals') {
      getMeal(id);
      getMealRecomend();
    } else {
      getDrink(id);
      getDrinkRecomend();
    }

    console.log(recomend);
  }, [id, recomend, type]);

  if (recipe !== '') {
    const keys = Object.keys(recipe[type][0]);
    const ingredients = keys.filter((key) => key.includes('Ingredient'));
    const measures = keys.filter((key) => key.includes('Measure'));
    const video = (
      <video data-testid="video" width="750" height="500" controls>
        <track default kind="captions" />
        <source src={ recipe[type][0].strYoutube } type="video/mp4" />
      </video>
    );

    return (
      <>
        <img
          src={ type === 'meals'
            ? recipe.meals[0].strMealThumb
            : recipe.drinks[0].strDrinkThumb }
          alt="recipe"
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
        {type === 'meals' ? video : ''}
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { bottom: '0px', position: 'fixed' } }
        >
          Start recipe
        </button>
      </>
    );
  }
}

export default RecipeDetails;
