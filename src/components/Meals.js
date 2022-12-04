import React, { useContext, useEffect } from 'react';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  getMealCategoryList, getMealsByCategory, theMealDBName,
} from '../services/theMealDB';

function Meals() {
  const {
    mealList,
    setMealList,
    mealCategories,
    setMealCategories,
    currentCategory,
    setCurrentCategory,
    recipesByCategory,
    setRecipesByCategory,
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
      (data) => setRecipesByCategory(data.slice(0, MAX_RECIPES)),
    );
  }, [currentCategory, setRecipesByCategory]);

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
      {mealCategories
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
          : recipesByCategory
            .map((d) => (
              <div
                key={ d.strMeal }
                data-testid={ `${recipesByCategory.indexOf(d)}-recipe-card` }
              >
                <img
                  data-testid={ `${recipesByCategory.indexOf(d)}-card-img` }
                  src={ d.strMealThumb }
                  alt={ d.strMeal }
                />
                <h3
                  data-testid={ `${recipesByCategory.indexOf(d)}-card-name` }
                >
                  {d.strMeal}

                </h3>
              </div>
            ))}
      </section>
    </div>
  );
}

export default Meals;
