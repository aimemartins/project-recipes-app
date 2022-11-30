import React from 'react';
import Routes from './Routes';
import RecipesAppProvider from './context/RecipesAppProvider';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesAppProvider>
      <Routes />
    </RecipesAppProvider>
  );
}

export default App;
