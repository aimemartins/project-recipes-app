import React, { useContext, useEffect } from 'react';
import Header from './Header';
import RecipesAppContext from '../context/RecipesAppContext';
import { theCocktailDBName } from '../services/theCocktailDB';

function Drinks() {
  const { drinkList, setDrinkList } = useContext(RecipesAppContext);

  const MAX_RECIPES = 12;

  useEffect(() => {
    theCocktailDBName().then(
      (data) => setDrinkList(data.slice(0, MAX_RECIPES)),
    );
  }, [setDrinkList]);

  return (
    <div>
      <Header title="Drinks" />
      <section>
        { drinkList
          .map((drink) => (
            <div
              key={ drink.strDrink }
              data-testid={ `${drinkList.indexOf(drink)}-recipe-card` }
            >
              <img
                data-testid={ `${drinkList.indexOf(drink)}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <h3
                data-testid={ `${drinkList.indexOf(drink)}-card-name` }
              >
                {drink.strDrink}

              </h3>
            </div>
          ))}
      </section>
    </div>
  );
}

export default Drinks;
