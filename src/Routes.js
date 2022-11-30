import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
      {/* <Route
          path="/meals/:id"
          render={ (props) => (
            < { ...props } />
          ) }
        />
        <Route
          path="/drinks/:id"
          render={ (props) => (
            < { ...props } />
          ) }
        />
        <Route
          path="/meals/:id-da-receita/in-progress"
          render={ (props) => (
            < { ...props } />
          ) }
        />
         <Route
          path="/drinks/:id-da-receita/in-progress"
          render={ (props) => (
            < { ...props } />
          ) }
        /> */}
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
