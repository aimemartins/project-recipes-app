import React, { useContext, useEffect } from 'react';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';
import { theMealDBName } from '../services/theMealDB';

function Meals() {
  const { mealList, setMealList } = useContext(RecipesAppContext);
  const MAX_RECIPES = 12;

  useEffect(() => {
    theMealDBName().then(
      (data) => setMealList(data.slice(0, MAX_RECIPES)),
    );
  }, [setMealList]);
  return (
    <div>
      <Header title="Meals" />
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
