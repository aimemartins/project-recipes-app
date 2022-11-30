import React from 'react';
import '../styles/Footer.css';
import { useHistory } from 'react-router-dom';
import drink from '../images/drinkIcon.svg';
import meal from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        onClick={ () => history.push('/meals') }
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
        onClick={ () => history.push('/drinks') }
        className="buttons-footer"
      >
        <img src={ drink } alt="drinks icon" data-testid="drinks-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
