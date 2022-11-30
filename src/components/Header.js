import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ title }) {
  const [search, setSearch] = useState(false);
  const [searchBtn, setSearchBtn] = useState(true);
  const history = useHistory();

  const searchBool = () => {
    if (search === false) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  };

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
    <img
      src="../images/searchIcon.svg"
      alt="search-icon"
      data-testid="search-top-btn"
    />
  );

  return (
    <div>
      <button
        type="button"
        onClick={ () => clickProfile() }
      >
        <img
          src="../src/images/profileIcon.svg"
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </button>

      { searchBtn
        ? <button type="button" onClick={ () => searchBool() }>{ btn }</button>
        : '' }

      { search
        ? <input type="text" data-testid="search-input" />
        : '' }

      <h1 data-testid="page-title">{ title }</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default Header;
