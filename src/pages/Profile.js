import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GiHotMeal } from 'react-icons/gi';
import { BsBookmarkHeart } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      localStorage.setItem('user', JSON.stringify({ email: '' }));
    }
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);
  }, []);

  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile">
      <Header title="Profile" />
      <div className="profile-container">
        <p data-testid="profile-email">{email}</p>
        <div className="profile-btn-container">
          <button
            data-testid="profile-done-btn"
            type="button"
            onClick={ () => history.push('/done-recipes') }
          >
            <GiHotMeal />
          </button>
          <p>Done Recipes</p>
        </div>
        <div className="profile-btn-container">
          <button
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => history.push('/favorite-recipes') }
          >
            <BsBookmarkHeart />
          </button>
          <p>Favorite Recipes</p>
        </div>
        <div className="profile-btn-container">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => handleLogout() }
          >
            <AiOutlineLogout />
          </button>
          <p>Logout</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
