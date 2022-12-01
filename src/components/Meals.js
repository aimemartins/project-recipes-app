import React, { useContext, useEffect } from 'react';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';
import { getMealCategoryList, theMealDBName } from '../services/theMealDB';

function Meals() {
  const {
    mealList,
    setMealList,
    mealCategories,
    setMealCategories,
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

  return (
    <div>
      <Header title="Meals" />
      {mealCategories
        .map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}

          </button>
        ))}
      <section>
        { mealList
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
          ))}
      </section>
    </div>
  );
}

export default Meals;
