import React, { useContext } from 'react';
import '../styles/Footer.css';
import { useHistory } from 'react-router-dom';
import drink from '../images/drinkIcon.svg';
import meal from '../images/mealIcon.svg';
import RecipesAppContext from '../context/RecipesAppContext';

function Footer() {
  const history = useHistory();
  const { setIsFiltering, setCurrentCategory } = useContext(RecipesAppContext);
  return (
    <footer data-testid="footer">
      <button
        onClick={ () => {
          history.push('/meals');
          setIsFiltering(false);
          setCurrentCategory('');
        } }
        type="button"
        className="buttons-footer"
      >
        <img
          src={ meal }
          alt="meal icon"
          data-testid="meals-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => {
          history.push('/drinks');
          setIsFiltering(false);
          setCurrentCategory('');
        } }
        className="buttons-footer"
      >
        <img src={ drink } alt="drinks icon" data-testid="drinks-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
