import React from 'react';
import Routes from './Routes';
import RecipesAppProvider from './context/RecipesAppProvider';
import SearchBar from './components/SearchBar';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesAppProvider>
      <Routes />
      <SearchBar />
    </RecipesAppProvider>
  );
}

export default App;
