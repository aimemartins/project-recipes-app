import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';

function Meals() {
  const {
    mealList,
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
    async function getMealCategoryList(name = 'list') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/list.php?c=${name}`;
      const fetchCategories = await fetch(endpoint);
      const { meals } = await fetchCategories.json();
      return setMealCategories(meals.slice(0, MAX_CATEGORIES));
    }
    getMealCategoryList();
  }, [setMealCategories]);

  useEffect(() => {
    async function getMealsByCategory(keyword) {
      if (!keyword) {
        return [];
      }
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${keyword}`;
      const fetchMeals = await fetch(endpoint);
      const { meals } = await fetchMeals.json();
      return setRecipesByCategory(meals.slice(0, MAX_RECIPES));
    }
    getMealsByCategory(currentCategory);
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
              <Link
                key={ meal.strMeal }
                to={ `/meals/${meal.idMeal}` }
              >
                <div
                  data-testid={ `${mealList.indexOf(meal)}-recipe-card` }
                  style={ { width: '100%' } }
                >
                  <img
                    data-testid={ `${mealList.indexOf(meal)}-card-img` }
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                    style={ { width: '40px', height: '40px' } }
                  />
                  <h3
                    data-testid={ `${mealList.indexOf(meal)}-card-name` }
                  >
                    {meal.strMeal}

                  </h3>
                </div>
              </Link>
            ))
          : recipesByCategory
            .map((d) => (
              <Link
                key={ d.strMeal }
                to={ `/meals/${d.idMeal}` }
              >
                <div
                  data-testid={ `${recipesByCategory.indexOf(d)}-recipe-card` }
                  style={ { width: '100%' } }
                >
                  <img
                    data-testid={ `${recipesByCategory.indexOf(d)}-card-img` }
                    src={ d.strMealThumb }
                    alt={ d.strMeal }
                    style={ { width: '40px', height: '40px' } }
                  />
                  <h3
                    data-testid={ `${recipesByCategory.indexOf(d)}-card-name` }
                  >
                    {d.strMeal}

                  </h3>
                </div>
              </Link>
            ))}
      </section>
    </div>
  );
}

export default Meals;
