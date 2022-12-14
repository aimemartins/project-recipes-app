import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaGlassMartiniAlt } from 'react-icons/fa';
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
    <div className="container-recipes">
      {/* <Header title="Drinks" /> */}
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => {
            setIsFiltering(false);
            setCurrentCategory('');
          } }
        >
          <FaGlassMartiniAlt />
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
      </div>
      <div className="container">
        <Row>
          {!isFiltering
            ? drinkList
              .map((drink) => (
                <Col
                  xs={ 6 }
                  sm={ 4 }
                  md={ 3 }
                  lg={ 2 }
                  xl={ 2 }
                  xxl={ 1 }
                  key={ drink.strDrink }
                >
                  <Link
                    to={ `/drinks/${drink.idDrink}` }
                  >
                    <div
                      data-testid={ `${drinkList.indexOf(drink)}-recipe-card` }
                      className="card"
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
                  key={ d.strDrink }
                >
                  <Link
                    to={ `/drinks/${d.idDrink}` }
                  >
                    <div
                      data-testid={ `${recipesByCategory.indexOf(d)}-recipe-card` }
                      className="card"
                    >
                      <img
                        data-testid={ `${recipesByCategory.indexOf(d)}-card-img` }
                        src={ d.strDrinkThumb }
                        alt={ d.strDrink }
                      />
                      <h3
                        data-testid={ `${recipesByCategory.indexOf(d)}-card-name` }
                      >
                        {d.strDrink}

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

export default Drinks;
