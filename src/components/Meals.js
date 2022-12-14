import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  GiMeal,
  GiMeat,
  GiGoat,
  GiChickenOven,
  GiSlicedBread,
  GiCakeSlice,
} from 'react-icons/gi';
import RecipesAppContext from '../context/RecipesAppContext';
import Header from './Header';

const icons = [
  <GiMeat key={ 1 } />,
  <GiGoat key={ 2 } />,
  <GiChickenOven key={ 3 } />,
  <GiSlicedBread key={ 4 } />,
  <GiCakeSlice key={ 5 } />,
];

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
    <div className="container-recipes">
      {/* <Header title="Meals" /> */}
      <div className="buttons">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => {
            setIsFiltering(false);
            setCurrentCategory('');
          } }
        >
          <GiMeal />
        </button>
        {mealCategories
          .map((category, index) => (
            <button
              type="button"
              key={ category.strCategory }
              value={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ handleClick }
            >
              {icons[index]}

            </button>
          ))}
      </div>
      <div className="container">
        <Row>
          { !isFiltering
            ? mealList

              .map((meal) => (
                <Col
                  xs={ 6 }
                  sm={ 4 }
                  md={ 3 }
                  lg={ 2 }
                  xl={ 2 }
                  xxl={ 1 }
                  key={ meal.strMeal }
                >
                  <Link
                    to={ `/meals/${meal.idMeal}` }
                  >
                    <div
                      data-testid={ `${mealList.indexOf(meal)}-recipe-card` }
                      className="card"
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
                  </Link>
                </Col>
              ))
            : recipesByCategory
              .map((d) => (
                <Col
                  xs={ 6 }
                  sm={ 4 }
                  md={ 3 }
                  lg={ 2 }
                  xl={ 2 }
                  xxl={ 1 }
                  key={ d.strMeal }
                >
                  <Link
                    key={ d.strMeal }
                    to={ `/meals/${d.idMeal}` }
                  >
                    <div
                      data-testid={ `${recipesByCategory.indexOf(d)}-recipe-card` }
                      className="card"
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
                  </Link>
                </Col>
              ))}
        </Row>
      </div>
    </div>
  );
}

export default Meals;
