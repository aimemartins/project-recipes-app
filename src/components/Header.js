import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBBtn } from 'mdb-react-ui-kit';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

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
      src={ SearchIcon }
      alt="search-icon"
      data-testid="search-top-btn"
    />
  );

  return (
    <MDBContainer className="headerContainer">
      <MDBBtn
        className="profileBtn"
        type="button"
        onClick={ () => clickProfile() }
      >
        <img
          src={ ProfileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </MDBBtn>

      { searchBtn
        ? (
          <MDBBtn
            color="info"
            type="button"
            onClick={ () => searchBool() }
          >
            { btn }
          </MDBBtn>)
        : '' }

      { search
        ? <SearchBar />
        : '' }

      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
    </MDBContainer>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
