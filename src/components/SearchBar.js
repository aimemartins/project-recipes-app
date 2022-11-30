import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import fetchAPI from '../services/API';

export default function SearchBar() {
  const
    {
      searchInput,
      setsearchInput,
      chosenRadio,
      setChosenRadio,
      setResultSearch,
    } = useContext(RecipesAppContext);

  const history = useHistory();

  const handleClick = async () => {
    const { pathname } = history.location;
    console.log(pathname);
    const url = pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
    if (chosenRadio === 'search.php?f=' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const response = await fetchAPI(url, chosenRadio, searchInput);
    setResultSearch(response);
  };

  return (
    <div className="SearchBar">
      <div>
        <input
          type="text"
          name="search-input"
          value={ searchInput }
          placeholder="Search"
          data-testid="search-input"
          onChange={ ({ target }) => setsearchInput(target.value) }
        />
      </div>
      <div>
        <label htmlFor="ingredient-search-radio">
          <input
            name="ingredient-search-radio"
            type="radio"
            id="ingredient-search-radio"
            value="filter.php?i="
            checked={ chosenRadio === 'filter.php?i=' }
            onChange={ ({ target }) => setChosenRadio(target.value) }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>

        <label htmlFor="name-search-radio">
          <input
            name="name-search-radio"
            type="radio"
            id="name-search-radio"
            value="search.php?s="
            checked={ chosenRadio === 'search.php?s=' }
            onChange={ ({ target }) => setChosenRadio(target.value) }
            data-testid="name-search-radio"
          />
          Name
        </label>

        <label htmlFor="first-letter-search-radio">
          <input
            name="first-letter-search-radio"
            type="radio"
            id="first-letter-search-radio"
            value="search.php?f="
            checked={ chosenRadio === 'search.php?f=' }
            onChange={ ({ target }) => setChosenRadio(target.value) }
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
        <div>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ () => handleClick() }
          >
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}
