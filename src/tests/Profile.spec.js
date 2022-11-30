import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const localStorageMock = (() => {
  let store = { user: '{"email": "rodrigo@gmail.com"}' };

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

describe('Testing Profile page', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });
  it('Testing if renders properly', () => {
    const btnContent = ['Done Recipes/profile-done-btn', 'Favorite Recipes/profile-favorite-btn', 'Logout/profile-logout-btn'];
    renderWithRouter(<App />, '/profile');
    const btns = screen.getAllByRole('button');
    expect(btns).toHaveLength(5);
    btns.slice(0, 3).forEach((btn, index) => {
      expect(btn).toHaveTextContent(btnContent[index].split('/')[0]);
      expect(btn).toHaveAttribute('data-testid', btnContent[index].split('/')[1]);
    });
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('rodrigo@gmail.com');
  });
  it('Testing if Done Recipes button redirects to "/done-recipes', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const doneRecipeBtn = screen.getByRole('button', { name: 'Done Recipes' });
    userEvent.click(doneRecipeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  it('Testing if Favorite Recipes button redirects to "/favorite-recipes', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const favRecipeBtn = screen.getByRole('button', { name: 'Favorite Recipes' });
    userEvent.click(favRecipeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('Testing if Logout button redirects to "/', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const logoutBtn = screen.getByRole('button', { name: 'Logout' });
    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toEqual({ email: 'rodrigo@gmail.com' });
    userEvent.click(logoutBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const newUser = JSON.parse(localStorage.getItem('user'));
    expect(newUser).toBeNull();
  });
});
