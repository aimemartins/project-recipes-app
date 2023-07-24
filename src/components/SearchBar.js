import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MDBInput, MDBRadio, MDBBtnGroup, MDBBtn } from 'mdb-react-ui-kit';
import RecipesAppContext from '../context/RecipesAppContext';
import fetchAPI from '../services/API';
import '../styles/Header.css';

const MAX_RECIPES = 12;

export default function SearchBar() {
  const
    {
      searchInput,
      setsearchInput,
      chosenRadio,
      setChosenRadio,
      resultSearch,
      setResultSearch,
      setRecipesByCategory,
      setIsFiltering,
    } = useContext(RecipesAppContext);

  const history = useHistory();

  const returnsDetailsPage = (response) => {
    const { pathname } = history.location;
    if (pathname === '/meals') {
      history.push(`/meals/${response[0].idMeal}`);
    } else {
      history.push(`/drinks/${response[0].idDrink}`);
    }
  };

  const handleFetch = async () => {
    const { pathname } = history.location;
    const type = pathname.split('/')[1];
    const url = pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
    setIsFiltering(true);
    const response = await fetchAPI(url, chosenRadio, searchInput);
    if (response[type] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (response[type].length === 1) {
      returnsDetailsPage(response[type]);
    } else {
      const result = response[type].slice(0, MAX_RECIPES);
      setResultSearch(result);
    }
  };

  const handleClick = () => {
    if (chosenRadio === 'search.php?f=' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      handleFetch();
    }
  };
  useEffect(() => {
    setRecipesByCategory(resultSearch);
  }, [resultSearch]);

  return (
    <div className="SearchBar">
      <div>
        <MDBInput
          className="searchImput"
          label="search"
          type="text"
          name="search-input"
          value={ searchInput }
          // placeholder="Search"
          data-testid="search-input"
          onChange={ ({ target }) => setsearchInput(target.value) }
        />
      </div>
      <MDBBtnGroup className="searchRadios">
        {/* <label htmlFor="ingredient-search-radio"> */}
        <MDBRadio
          name="ingredient-search-radio"
          type="radio"
          id="ingredient-search-radio"
          value="filter.php?i="
          checked={ chosenRadio === 'filter.php?i=' }
          onChange={ ({ target }) => setChosenRadio(target.value) }
          data-testid="ingredient-search-radio"
        />
        Ingredient
        {/* </label> */}

        {/* <label htmlFor="name-search-radio"> */}
        <MDBRadio
          name="name-search-radio"
          type="radio"
          id="name-search-radio"
          value="search.php?s="
          checked={ chosenRadio === 'search.php?s=' }
          onChange={ ({ target }) => setChosenRadio(target.value) }
          data-testid="name-search-radio"
        />
        Name
        {/* </label> */}

        {/* <label htmlFor="first-letter-search-radio"> */}
        <MDBRadio
          name="first-letter-search-radio"
          type="radio"
          id="first-letter-search-radio"
          value="search.php?f="
          checked={ chosenRadio === 'search.php?f=' }
          onChange={ ({ target }) => setChosenRadio(target.value) }
          data-testid="first-letter-search-radio"
        />
        First letter
        {/* </label> */}
      </MDBBtnGroup>
      <div>
        <MDBBtn
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleClick() }
        >
          SEARCH
        </MDBBtn>
      </div>
    </div>
  );
}
