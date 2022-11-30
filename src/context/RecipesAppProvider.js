import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [searchInput, setsearchInput] = useState(''); // estado da pesquisa de texto
  const [chosenRadio, setChosenRadio] = useState('');
  const [page, setPage] = useState('Cocktails');
  const [pageMeals, setpageMeals] = useState('Meals');
  const [pageCocktails, setpageCocktails] = useState('Cocktails');
  const [meals, setMeals] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [calledAPI, setCalledAPI] = useState('');
  const [resultSearch, setResultSearch] = useState([]);

  const value = useMemo(() => ({
    searchInput,
    setsearchInput,
    chosenRadio,
    setChosenRadio,
    page,
    setPage,
    pageMeals,
    setpageMeals,
    pageCocktails,
    setpageCocktails,
    meals,
    setMeals,
    cocktails,
    setCocktails,
    resultSearch,
    setResultSearch,
    calledAPI,
    setCalledAPI,
  }), [
    searchInput,
    setsearchInput,
    chosenRadio,
    setChosenRadio,
    page,
    setPage,
    pageMeals,
    setpageMeals,
    pageCocktails,
    setpageCocktails,
    meals,
    setMeals,
    cocktails,
    setCocktails,
    resultSearch,
    setResultSearch,
    calledAPI,
    setCalledAPI,
  ]);

  return (
    <RecipesAppContext.Provider value={ value }>
      <div>
        {children}
      </div>
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesAppProvider;
