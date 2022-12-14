import React, { useEffect, useLayoutEffect, useState } from 'react';
// import { MDBContainer, MDBBtn } from 'mdb-react-ui-kit';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GiHotMeal } from 'react-icons/gi';
import { BsBookmarkHeart } from 'react-icons/bs';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import Group4 from '../images/Group4.png';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title }) {
  const [search, setSearch] = useState(false);
  const [searchBtn, setSearchBtn] = useState(true);
  const [icon, setIcon] = useState('');
  const history = useHistory();

  const searchBool = () => {
    if (search === false) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  };

  useLayoutEffect(() => {
    const { location: { pathname } } = history;
    switch (pathname) {
    case '/meals':
      setIcon(<img
        className="type"
        src={ MealIcon }
        alt="type"
      />);
      break;
    case '/drinks':
      setIcon(<img
        className="type"
        src={ DrinkIcon }
        alt="type"
      />);
      break;
    case '/done-recipes':
      setIcon(<GiHotMeal />);
      break;
    case '/favorite-recipes':
      setIcon(<BsBookmarkHeart />);
      break;
    default:
      setIcon(
        <img
          className="type"
          src={ ProfileIcon }
          alt="type"
        />,
      );
    }
  }, []);

  const searchBtnBool = () => {
    const { location: { pathname } } = history;
    if (pathname === '/profile'
      || pathname === '/done-recipes'
      || pathname === '/favorite-recipes') {
      setSearchBtn(false);
    }
  };

  useEffect(() => {
    searchBtnBool();
  });

  const clickProfile = () => {
    history.push('/profile');
  };

  const btn = (
    <button
      className="buttons-header"
      type="button"
      onClick={ () => searchBool() }
    >
      <img
        src={ SearchIcon }
        alt="search-icon"
        data-testid="search-top-btn"
      />

    </button>
  );

  return (
    <div className="header">
      <div className="btns">
        <div className="container-icons">
          <img src={ Group4 } alt="icon" />
          <p className="text-icon">
            RECIPE
            <strong>app</strong>
          </p>
        </div>

        <div className="container-buttons">

          { searchBtn
            ? btn
            : '' }

          <button
            type="button"
            className="buttons-header"
            onClick={ () => clickProfile() }
          >
            <img
              src={ ProfileIcon }
              alt="profile-icon"
              data-testid="profile-top-btn"
            />
          </button>

        </div>

      </div>
      <div className="header-icon-container">
        {icon}

      </div>

      <h1 data-testid="page-title" className="title">{ title }</h1>
      { search
        ? <SearchBar />
        : '' }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
