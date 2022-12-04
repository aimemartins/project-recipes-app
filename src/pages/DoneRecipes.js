import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([{
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      }]));
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(doneRecipes);
    setFilterRecipes(doneRecipes);
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterRecipes(recipes) }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => {
          setFilterRecipes(recipes
            .filter(({ type }) => type === 'meal'));
        } }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          setFilterRecipes(recipes
            .filter(({ type }) => type === 'drink'));
        } }
      >
        Drinks
      </button>
      <RecipesList recipes={ filterRecipes } />
    </div>
  );
}

export default DoneRecipes;
