import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CheckBox from '../components/CheckBox';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState('');
  const [inProgress, setInProgress] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const history = useHistory();
  const arrLoc = history.location.pathname.split('/');
  const type = arrLoc[1];
  const { id } = useParams();
  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          drinks: {
            178319: [],
          },
          meals: {
            52771: [],
          },
        }),
      );
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setInProgress(inProgressRecipes);
  }, []);

  useEffect(() => {
    const getDrink = async (idRecipe) => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      setRecipe(result);
    };

    const getMeal = async (idRecipe) => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      setRecipe(result);
    };

    if (type === 'meals') {
      getMeal(id);
    } else {
      getDrink(id);
    }
  }, []);
  if (recipe === '') return null;
  const keys = Object.keys(recipe[type][0]);
  const ingredients = keys.filter((key) => key.includes('Ingredient'))
    .filter((ingredient) => recipe[type][0][ingredient] !== null
  && recipe[type][0][ingredient] !== '');
  const handleCheckBox = (ingredient, check) => {
    if (check) {
      let newProgress = inProgress;
      newProgress = {
        ...inProgress,
        [type]: {
          ...inProgress[type], [id]: [...inProgress[type][id], ingredient],
        },
      };
      setInProgress(newProgress);
      setIsBtnDisabled(newProgress[type][id].length === ingredients.length);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
    } else {
      let newProgress = inProgress;
      newProgress = {
        ...inProgress,
        [type]: {
          ...inProgress[type],
          [id]: [...inProgress[type][id]
            .filter((el) => el !== ingredient)],
        },
      };
      setInProgress(newProgress);
      setIsBtnDisabled(newProgress[type][id].length === ingredients.length);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
    }
  };
  return (
    <>
      <img
        src={
          type === 'meals'
            ? recipe.meals[0].strMealThumb
            : recipe.drinks[0].strDrinkThumb
        }
        alt="recipe"
        width="50px"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        {type === 'meals' ? recipe.meals[0].strMeal : recipe.drinks[0].strDrink}
      </h1>
      <h3 data-testid="recipe-category">
        {recipe[type][0].strCategory}
        {' '}
        {type === 'drinks' ? recipe[type][0].strAlcoholic : ''}
      </h3>
      <p data-testid="instructions">{recipe[type][0].strInstructions}</p>
      <ShareButton type={ type } id={ id } />
      <FavoriteButton recipe={ recipe } id={ id } type={ type } />
      <ul>
        {ingredients
          .map((i, index) => (
            <CheckBox
              key={ index }
              index={ index }
              ingredient={ recipe[type][0][i] }
              handleCheckBox={ handleCheckBox }
              isChecked={ inProgress[type][id].includes(recipe[type][0][i]) }
            />
          ))}
      </ul>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/done-recipes') }
        disabled={ !isBtnDisabled }
      >
        Finish recipe
      </button>
    </>
  );
}

export default RecipeInProgress;
