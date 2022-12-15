import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
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
    <div style={ { background: '#faf6ed', height: '100vh' } }>
      <Header title="Done Recipes" />
      {/* <button
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
      </button> */}
      <ButtonToolbar
        aria-label="Toolbar with button groups"
        style={ {
          margin: '10%',
          paddingLeft: '5%',
          borderBottom: '10%',
        } }
      >
        <ButtonGroup className="me-2" aria-label="Second group">
          <Button
            data-testid="filter-by-all-btn"
            onClick={ () => setFilterRecipes(recipes) }
            style={ { backgroundColor: '#748332' } }
          >
            All

          </Button>
          <Button
            data-testid="filter-by-meal-btn"
            onClick={ () => {
              setFilterRecipes(recipes
                .filter(({ type }) => type === 'meal'));
            } }
            style={ { backgroundColor: '#748332' } }
          >
            Meals

          </Button>
          <Button
            data-testid="filter-by-drink-btn"
            onClick={ () => {
              setFilterRecipes(recipes
                .filter(({ type }) => type === 'drink'));
            } }
            style={ { backgroundColor: '#748332' } }
          >
            Drinks

          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <RecipesList recipes={ filterRecipes } />
    </div>
  );
}

export default DoneRecipes;
