import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const getEmail = () => screen.getByTestId('email-input');
const getPassword = () => screen.getByTestId('password-input');

const localStorageMock = (() => {
  let store = {};

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

describe('Testing Login page', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });
  it('Testing if renders properly', () => {
    renderWithRouter(<App />);
    const email = getEmail();
    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute('type', 'email');
    const password = getPassword();
    expect(password).toBeInTheDocument();
    expect(password).toHaveAttribute('type', 'password');
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Enter');
    expect(btn).toHaveAttribute('type', 'submit');
    expect(btn).toHaveAttribute('data-testid', 'login-submit-btn');
    expect(btn).toBeDisabled();
  });
  it('Testing if typing wrong formats of password or email, the button is disabled', () => {
    const attempts = ['rodrigo 123', 'rodrigo@email 123', 'rodrigo@email.com 12345', 'rodrigo 1234567', 'rodrigo@email 1234567'];
    renderWithRouter(<App />);
    const email = getEmail();
    const password = getPassword();
    attempts.forEach((attempt) => {
      userEvent.type(email, attempt.split(' ')[0]);
      userEvent.type(password, attempt.split(' ')[1]);
      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
      userEvent.clear(email);
      userEvent.clear(password);
    });
  });
  it('Testing if typing a valid password and email, the button is enabled', () => {
    renderWithRouter(<App />);
    const email = getEmail();
    const password = getPassword();
    userEvent.type(email, 'rodrigo@email.com');
    expect(email).toHaveDisplayValue('rodrigo@email.com');
    userEvent.type(password, '1234567');
    expect(password).toHaveDisplayValue('1234567');
    const btn = screen.getByRole('button');
    expect(btn).toBeEnabled();
  });
  it('Testing if when the user logged in, its redirect to "/meals" and the users email is saved in localStorage', () => {
    const { history } = renderWithRouter(<App />);
    const email = getEmail();
    const password = getPassword();
    userEvent.type(email, 'rodrigo@mail.com');
    userEvent.type(password, '1234567');
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toEqual({ email: 'rodrigo@mail.com' });
  });
});
