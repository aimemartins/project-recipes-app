import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [searchInput, setsearchInput] = useState(''); // estado da pesquisa de texto
  const [chosenRadio, setChosenRadio] = useState('');
  const [resultSearch, setResultSearch] = useState([]);

  const value = useMemo(() => ({
    searchInput,
    setsearchInput,
    chosenRadio,
    setChosenRadio,
    resultSearch,
    setResultSearch,
  }), [
    searchInput,
    setsearchInput,
    chosenRadio,
    setChosenRadio,
    resultSearch,
    setResultSearch,
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
