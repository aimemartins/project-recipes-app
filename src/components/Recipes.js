import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';
import Footer from './Footer';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/Recipes.css';

export default function Recipes() {
  const MAX_RECIPES = 12;
  const { location } = useHistory();
  const {
    setDrinkList,
    setMealList,
  } = useContext(RecipesAppContext);

  useEffect(() => {
    async function theCocktailDBName(name = '') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
      const fetchTheMeal = await fetch(endpoint);
      const { drinks } = await fetchTheMeal.json();
      return setDrinkList(drinks.slice(0, MAX_RECIPES));
    }
    theCocktailDBName();
  }, [setDrinkList]);

  useEffect(() => {
    async function theMealDBName(name = '') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
      const fetchTheMeal = await fetch(endpoint);
      const { meals } = await fetchTheMeal.json();
      // console.log(meals);

      return setMealList(meals.slice(0, MAX_RECIPES));
    }
    theMealDBName();
  }, [setMealList]);

  return (
    <>
      { location.pathname === '/drinks'
        ? <Drinks />
        : <Meals />}
      <Footer />
    </>
  );
}
