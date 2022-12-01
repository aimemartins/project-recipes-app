import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const localStorageMock = (() => {
  let store = { doneRecipes: '[{ "id": "52771", "type": "meal", "nationality": "Italian", "category": "Vegetarian", "alcoholicOrNot": "", "name": "Spicy Arrabiata Penne", "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg", "doneDate": "23/06/2020", "tags": ["Pasta", "Curry"]}, { "id": "178319", "type": "drink", "nationality": "", "category": "Cocktail", "alcoholicOrNot":  "Alcoholic", "name": "Aquamarine", "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg", "doneDate": "23/06/2020", "tags": [] }]' };
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

describe('Testing Done Recipes page', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');
  });
  it('Testing Filters buttons', () => {
    renderWithRouter(<App />, '/done-recipes');
    const mealsBtn = screen.getByRole('button', { name: 'Meals' });
    userEvent.click(mealsBtn);
    const drink = screen.queryByText('Aquamarine');
    expect(drink).not.toBeInTheDocument();
    const allBtn = screen.getByRole('button', { name: 'All' });
    userEvent.click(allBtn);
    const meal = screen.queryByText('Spicy Arrabiata Penne');
    const newDrink = screen.queryByText('Aquamarine');
    expect(newDrink).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
    const drinkBtn = screen.getByRole('button', { name: 'Drinks' });
    userEvent.click(drinkBtn);
    expect(meal).not.toBeInTheDocument();
  });
  it('Testing share Button', () => {
    renderWithRouter(<App />, '/done-recipes');
    const btns = screen.getAllByRole('button');
    userEvent.click(btns[4]);
    expect(btns[4]).toHaveTextContent('Link copied!');
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meal/52771');
  });
});
