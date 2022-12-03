import React, { useContext, useEffect } from 'react';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  getDrinkCategoryList, getDrinksByCategory, theCocktailDBName,
} from '../services/theCocktailDB';

function Drinks() {
  const {
    drinkList,
    setDrinkList,
    drinkCategories,
    setDrinkCategories,
    currentCategory,
    setCurrentCategory,
    drinksByCategory,
    setDrinksByCategory,
    isFiltering,
    setIsFiltering,
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
  useEffect(() => {
    getDrinksByCategory(currentCategory).then(
      (data) => setDrinksByCategory(data),
    );
  }, [currentCategory, setDrinksByCategory]);

  const handleClick = ({ target }) => {
    setIsFiltering(true);
    setCurrentCategory(target.value);
  };

  return (
    <div>
      <Header title="Drinks" />
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
      {drinkCategories
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
          ? drinkList
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
            ))
          : drinksByCategory
            .map((d) => (
              <div
                key={ d.strDrink }
                data-testid={ `${drinkList.indexOf(d)}-recipe-card` }
              >
                <img
                  data-testid={ `${drinkList.indexOf(d)}-card-img` }
                  src={ d.strDrinkThumb }
                  alt={ d.strDrink }
                />
                <h3
                  data-testid={ `${drinkList.indexOf(d)}-card-name` }
                >
                  {d.strDrink}

                </h3>
              </div>
            ))}
      </section>
    </div>
  );
}

export default Drinks;
