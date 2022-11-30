import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testing Footer component', () => {
  it('Testing if footer render properly', () => {
    const { container } = renderWithRouter(<App />, '/meals');
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(2);
    expect(imgs[0]).toHaveAttribute('src', 'mealIcon.svg');
    expect(imgs[0]).toHaveAttribute('alt', 'meal icon');
    expect(imgs[0]).toHaveAttribute('data-testid', 'meals-bottom-btn');
    expect(imgs[1]).toHaveAttribute('src', 'drinkIcon.svg');
    expect(imgs[1]).toHaveAttribute('alt', 'drinks icon');
    expect(imgs[1]).toHaveAttribute('data-testid', 'drinks-bottom-btn');
  });
  it('Testing if redirects to "/meals', () => {
    const { history } = renderWithRouter(<App />, '/meals');
    const mealBtn = screen.getByRole('button', { name: 'meal icon' });
    userEvent.click(mealBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
  it('Testing if redirects to "/drinks', () => {
    const { history } = renderWithRouter(<App />, '/meals');
    const drinkBtn = screen.getByRole('button', { name: 'drinks icon' });
    userEvent.click(drinkBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});
