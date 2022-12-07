import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';

function Drinks() {
  const {
    drinkList,
    drinkCategories,
    setDrinkCategories,
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
    async function getDrinkCategoryList(name = 'list') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=${name}`;
      const fetchCategories = await fetch(endpoint);
      const { drinks } = await fetchCategories.json();
      return setDrinkCategories(drinks.slice(0, MAX_CATEGORIES));
    }
    getDrinkCategoryList();
  }, [setDrinkCategories]);

  useEffect(() => {
    async function getDrinksByCategory(keyword) {
      if (!keyword) {
        return [];
      }
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${keyword}`;
      const fetchDrinks = await fetch(endpoint);
      const { drinks } = await fetchDrinks.json();
      return setRecipesByCategory(drinks.slice(0, MAX_RECIPES));
    }
    getDrinksByCategory(currentCategory);
  }, [currentCategory, setRecipesByCategory]);

  const handleClick = ({ target }) => {
    if (isFiltering) {
      setIsFiltering(false);
    } else {
      setIsFiltering(true);
      setCurrentCategory(target.value);
    }
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
        {!isFiltering
          ? drinkList
            .map((drink) => (
              <Link
                key={ drink.strDrink }
                to={ `/drinks/${drink.idDrink}` }
              >
                <div
                  data-testid={ `${drinkList.indexOf(drink)}-recipe-card` }
                  style={ { width: '100%' } }
                >
                  <img
                    data-testid={ `${drinkList.indexOf(drink)}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                    style={ { width: '40px', height: '40px' } }
                  />
                  <h3
                    data-testid={ `${drinkList.indexOf(drink)}-card-name` }
                  >
                    {drink.strDrink}

                  </h3>
                </div>
              </Link>
            ))
          : recipesByCategory
            .map((d) => (
              <Link
                key={ d.strDrink }
                to={ `/drinks/${d.idDrink}` }
              >
                <div
                  data-testid={ `${recipesByCategory.indexOf(d)}-recipe-card` }
                  style={ { width: '100%' } }
                >
                  <img
                    data-testid={ `${recipesByCategory.indexOf(d)}-card-img` }
                    src={ d.strDrinkThumb }
                    alt={ d.strDrink }
                    style={ { width: '40px', height: '40px' } }
                  />
                  <h3
                    data-testid={ `${recipesByCategory.indexOf(d)}-card-name` }
                  >
                    {d.strDrink}

                  </h3>
                </div>
              </Link>
            ))}
      </section>
    </div>
  );
}

export default Drinks;
