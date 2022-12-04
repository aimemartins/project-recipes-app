import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { meal, drinksRecomendation, drink, mealRecommendation } from './helpers/mock/recipeMock';

const dataTestId = 'data-testid';

const localStorageMock = (() => {
  let store = { inProgressRecipes: '{ "drinks": "{ 178319: [] }", "meals": "{}" }' };
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

describe('Testing Recipe Details component', () => {
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
  afterEach(() => {
    window.localStorage.clear();
  });
  it('Testing a meal detail page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meal)
        .mockResolvedValue(drinksRecomendation),
    });
    renderWithRouter(<App />, '/meals/52771');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const category = await screen.findByRole('heading', { level: 3 });
    expect(category).toBeInTheDocument();
    expect(category).toHaveAttribute(dataTestId, 'recipe-category');
    expect(category).toHaveTextContent('Vegetarian');
    const name = await screen.findByRole('heading', { level: 1 });
    expect(name).toBeInTheDocument();
    expect(name).toHaveAttribute(dataTestId, 'recipe-title');
    expect(name).toHaveTextContent('Spicy Arrabiata Penne');
    const recommendation = await screen.findByTestId('0-recommendation-card');
    expect(recommendation).toBeInTheDocument();
    const btn = await screen.findByTestId('start-recipe-btn');
    expect(btn).toHaveTextContent('Start recipe');
    userEvent.click(btn);
  });
  it('Testing a drink detail page ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drink)
        .mockResolvedValue(mealRecommendation),
    });
    renderWithRouter(<App />, '/drinks/178319');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const category = await screen.findByRole('heading', { level: 3 });
    expect(category).toBeInTheDocument();
    expect(category).toHaveAttribute(dataTestId, 'recipe-category');
    expect(category).toHaveTextContent('Cocktail');
    const name = await screen.findByRole('heading', { level: 1 });
    expect(name).toBeInTheDocument();
    expect(name).toHaveAttribute(dataTestId, 'recipe-title');
    expect(name).toHaveTextContent('Aquamarine');
    const recommendation = await screen.findByTestId('0-recommendation-card');
    expect(recommendation).toBeInTheDocument();
    const btn = await screen.findByTestId('start-recipe-btn');
    expect(btn).toHaveTextContent('Continue Recipe');
    // userEvent.click(btn);
  });
  // it('Test', async () => {
  //   jest.spyOn(global, 'fetch')
  //     .mockImplementationOnce(() => Promise.resolve({
  //       json: () => Promise.resolve(meal),
  //     }))
  //     .mockImplementationOnce(() => Promise.resolve({
  //       json: () => Promise.resolve(drinksRecomendation),
  //     }));
  //   renderWithRouter(<App />, '/meals/52771');
  //   // const btn = await screen.findByTestId('start-recipe-btn');
  //   // expect(btn).toHaveTextContent('Start recipe');
  // });
});

describe('Testing localStorage', () => {
  it('Testing when its null', async () => {
    const storage = { drinks: { 178319: [] }, meals: { 52771: [] } };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meal)
        .mockResolvedValue(drinksRecomendation),
    });
    renderWithRouter(<App />, '/meals/52771');
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(inProgressRecipes).toEqual(storage);
  });
});
