import React, { useContext, useEffect } from 'react';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  getMealCategoryList, getMealsByCategory, theMealDBName } from '../services/theMealDB';

function Meals() {
  const {
    mealList,
    setMealList,
    mealCategories,
    setMealCategories,
    currentCategory,
    setCurrentCategory,
    mealsByCategory,
    setMealsByCategory,
    isFiltering,
    setIsFiltering,
  } = useContext(RecipesAppContext);

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    theMealDBName().then(
      (data) => setMealList(data.slice(0, MAX_RECIPES)),
    );
  }, [setMealList]);
  useEffect(() => {
    getMealCategoryList().then(
      (data) => setMealCategories(data.slice(0, MAX_CATEGORIES)),
    );
  }, [setMealCategories]);
  useEffect(() => {
    getMealsByCategory(currentCategory).then(
      (data) => setMealsByCategory(data),
    );
  }, [currentCategory, setMealsByCategory]);

  const handleClick = ({ target }) => {
    setIsFiltering(true);
    setCurrentCategory(target.value);
  };

  return (
    <div>
      <Header title="Meals" />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          setIsFiltering(false);
          setCurrentCategory('');
        } }
      >
        All
      </button>
      { mealCategories
        .map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            value={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ handleClick }
          >
            {category.strCategory}

          </button>
        ))}
      <section>
        { !isFiltering
          ? mealList
            .map((meal) => (
              <div
                key={ meal.strMeal }
                data-testid={ `${mealList.indexOf(meal)}-recipe-card` }
              >
                <img
                  data-testid={ `${mealList.indexOf(meal)}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
                <h3
                  data-testid={ `${mealList.indexOf(meal)}-card-name` }
                >
                  {meal.strMeal}

                </h3>
              </div>
            ))
          : mealsByCategory
            .map((m) => (
              <div
                key={ m.strMeal }
                data-testid={ `${mealList.indexOf(m)}-recipe-card` }
              >
                <img
                  data-testid={ `${mealList.indexOf(m)}-card-img` }
                  src={ m.strMealThumb }
                  alt={ m.strMeal }
                />
                <h3
                  data-testid={ `${mealList.indexOf(m)}-card-name` }
                >
                  {m.strMeal}

                </h3>
              </div>
            ))}
      </section>
    </div>
  );
}

export default Meals;
