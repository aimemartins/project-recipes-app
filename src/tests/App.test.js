import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

/* test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<App />);
  const linkElement = screen.getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
}); */

describe('Header', () => {
  test('Testa se o botao de profile aparece na tela', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const profileBtn = screen.getByTestId('profile-top-btn');

    expect(profileBtn).toBeInTheDocument();
  });

  test('Testa se o botao de search aparece na tela', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const searchBtn = screen.getByTestId('search-top-btn');

    expect(searchBtn).toBeInTheDocument();
  });

  test('Testa se ao clicar no botao de search o input aparece na tela', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(input).not.toBeInTheDocument();
  });

  test('Testa se o botao de profile redireciona para a rota "/profile"', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const profileBtn = screen.getByTestId('profile-top-btn');

    userEvent.click(profileBtn);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/profile');
  });
});
