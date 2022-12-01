import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [searchInput, setsearchInput] = useState(''); // estado da pesquisa de texto
  const [chosenRadio, setChosenRadio] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [mealList, setMealList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);

  const value = useMemo(() => ({
    searchInput,
    setsearchInput,
    chosenRadio,
    setChosenRadio,
    resultSearch,
    setResultSearch,
    mealList,
    setMealList,
    drinkList,
    setDrinkList,
    drinkCategories,
    setDrinkCategories,
    mealCategories,
    setMealCategories,
  }), [
    searchInput,
    setsearchInput,
    chosenRadio,
    setChosenRadio,
    resultSearch,
    setResultSearch,
    mealList,
    setMealList,
    drinkList,
    setDrinkList,
    drinkCategories,
    setDrinkCategories,
    mealCategories,
    setMealCategories,
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
