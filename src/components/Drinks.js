import React, { useContext, useEffect } from 'react';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';
import { getDrinkCategoryList, theCocktailDBName } from '../services/theCocktailDB';

function Drinks() {
  const {
    drinkList,
    setDrinkList,
    drinkCategories,
    setDrinkCategories,
  } = useContext(RecipesAppContext);

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    theCocktailDBName().then(
      (data) => setDrinkList(data.slice(0, MAX_RECIPES)),
    );
  }, [setDrinkList]);
  useEffect(() => {
    getDrinkCategoryList().then(
      (data) => setDrinkCategories(data.slice(0, MAX_CATEGORIES)),
    );
  }, [setDrinkCategories]);

  return (
    <div>
      <Header title="Drinks" />
      {drinkCategories
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
        { drinkList
          .map((drink) => (
            <div
              key={ drink.strDrink }
              data-testid={ `${drinkList.indexOf(drink)}-recipe-card` }
            >
              <img
                data-testid={ `${drinkList.indexOf(drink)}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <h3
                data-testid={ `${drinkList.indexOf(drink)}-card-name` }
              >
                {drink.strDrink}

              </h3>
            </div>
          ))}
      </section>
    </div>
  );
}

export default Drinks;
