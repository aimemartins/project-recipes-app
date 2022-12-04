import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

function RecipesList({ recipes }) {
  return (
    <main>
      {recipes.map((recipe, index) => (
        <RecipeCard key={ recipe.name } index={ index } recipe={ recipe } />
      ))}
    </main>
  );
}

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RecipesList;
