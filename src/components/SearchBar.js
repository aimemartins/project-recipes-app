import React, { useContext, useEffect } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  theCocktailDBIngredient,
  theCocktailDBName,
  theCocktailDBFirstLet } from '../services/theCocktailDB';
import {
  theMealDBIngredient,
  theMealDBName,
  theMealDBFirstLet } from '../services/theMealDB';

export default function SearchBar() {
  const
    {
      searchInput,
      setsearchInput,
      chosenRadio,
      setChosenRadio,
      setCalledAPI,
      page,
      resultSearch,
      setResultSearch,
      calledAPI,
    } = useContext(RecipesAppContext);

  // PESQUISA POR INGREDIENTE
  const SearchByIngredient = async () => {
    if (page === 'Meals') {
      console.log('vc escolheu pesquisar por INGREDIENTE em COMIDA');
      const meal = await theMealDBIngredient(searchInput);
      setResultSearch(meal);
    }
    if (page === 'Cocktails') {
      console.log('vc escolheu pesquisar por INGREDIENTE em BEBIDA');
      const cocktail = await theCocktailDBIngredient(searchInput);
      setResultSearch(cocktail);
    }
  };

  // PESQUISA POR NOME
  const SearchByName = async () => {
    if (page === 'Meals') {
      console.log('vc escolheu pesquisar por NOME em COMIDA');
      const meal = await theMealDBName(searchInput);
      setResultSearch(meal);
    }
    if (page === 'Cocktails') {
      console.log('vc escolheu pesquisar por NOME em BEBIDA');
      const cocktail = await theCocktailDBName(searchInput);
      setResultSearch(cocktail);
    }
  };

  // PESQUISA POR PRIMEIRA LETRA
  const SearchByFirstLet = async () => {
    if (page === 'Meals') {
      console.log('vc escolheu pesquisar por LETRA em COMIDA');
      const meal = await theMealDBFirstLet(searchInput);
      setResultSearch(meal);
    }
    if (page === 'Cocktails') {
      console.log('vc escolheu pesquisar por LETRA em BEBIDA');
      const cocktail = await theCocktailDBFirstLet(searchInput);
      setResultSearch(cocktail);
    }
  };

  const handleClick = async () => {
    if (chosenRadio === 'ingredient-search-radio') {
      setCalledAPI(true);
      const response = await SearchByIngredient();
      return response;
    }

    if (chosenRadio === 'name-search-radio') {
      setCalledAPI(true);
      const response = await SearchByName();
      return response;
    }

    if (chosenRadio === 'first-letter-search-radio') {
      setCalledAPI(true);
      const response = await SearchByFirstLet();
      return response;
    }
  };
  console.log(resultSearch);
  useEffect(() => {
    handleClick();
  }, [calledAPI]);

  return (
    <div className="SearchBar">
      <p>
        Está renderizando a página:
        {' '}
        {page}
      </p>
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
            value="ingredient-search-radio"
            checked={ chosenRadio === 'ingredient-search-radio' }
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
            value="name-search-radio"
            checked={ chosenRadio === 'name-search-radio' }
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
            value="first-letter-search-radio"
            checked={ chosenRadio === 'first-letter-search-radio' }
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
        <div>
          {page === 'Cocktails' && calledAPI && 'Retorna a pesquisa de BEBIDAS'}
          {page === 'Meals' && calledAPI && 'Retorna a pesquisa de COMIDAS'}
          {/* {page === 'Cocktails' && calledAPI && resultSearch
            .map((result) => <p key={ result.idDrink }>{result.strDrink}</p>)}
          {page === 'Meals' && calledAPI && resultSearch
            .map((result) => <p key={ result.idMeal }>{result.strMeal}</p>)} */}
        </div>
      </div>
    </div>
  );
}
