import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { meal, drink } from './helpers/mock/recipeMock';

// const localStorageMock = (() => {
//   let store = { inProgressRecipes: '{ "meals": "{ 52771: [] }", "drinks": "{ 178319: [] }" }' };
//   return {
//     getItem: (key) => store[key] || null,
//     setItem: (key, value) => {
//       store[key] = value.toString();
//     },
//     removeItem: (key) => {
//       delete store[key];
//     },
//     clear: () => {
//       store = {};
//     },
//   };
// })();

const dataTestId = 'data-testid';

describe('Testing Recipe in progress component', () => {
  beforeEach(() => {
  // Object.defineProperty(window, 'localStorage', {
  //   value: localStorageMock,
  // });
    jest.mock('clipboard-copy');
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');
  });
  // afterEach(() => {
  //   window.localStorage.clear();
  // });
  it('Testing a meal progress page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meal),
    });
    const { history } = renderWithRouter(<App />, '/meals/52771/in-progress');
    // const ingredients = Object.entries(meal.meals[0]).filter((arr) => arr[0].includes('Ingredient') && arr[1] !== '' && arr[1] !== null).map((value) => value[1]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    const category = await screen.findByRole('heading', { level: 3 });
    expect(category).toBeInTheDocument();
    expect(category).toHaveAttribute(dataTestId, 'recipe-category');
    expect(category).toHaveTextContent('Vegetarian');
    const name = await screen.findByRole('heading', { level: 1 });
    expect(name).toBeInTheDocument();
    expect(name).toHaveAttribute(dataTestId, 'recipe-title');
    expect(name).toHaveTextContent('Spicy Arrabiata Penne');
    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toHaveTextContent('Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.');
    const btn = await screen.findByTestId('finish-recipe-btn');
    expect(btn).toHaveTextContent('Finish recipe');
    const checkboxs = await screen.findAllByRole('checkbox');
    expect(checkboxs).toHaveLength(8);
    checkboxs.forEach((checkbox) => {
      userEvent.click(checkbox);
    });
    userEvent.click(btn);
    const url = history.location.pathname;
    expect(url).toBe('/done-recipes');
  });
  it('Testing a drink progress page ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drink),
    });
    document.execCommand = jest.fn();
    const { history } = renderWithRouter(<App />, '/drinks/178319/in-progress');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    const category = await screen.findByRole('heading', { level: 3 });
    expect(category).toBeInTheDocument();
    expect(category).toHaveAttribute(dataTestId, 'recipe-category');
    expect(category).toHaveTextContent('Cocktail');
    const name = await screen.findByRole('heading', { level: 1 });
    expect(name).toBeInTheDocument();
    expect(name).toHaveAttribute(dataTestId, 'recipe-title');
    expect(name).toHaveTextContent('Aquamarine');
    const btn = await screen.findByTestId('finish-recipe-btn');
    expect(btn).toHaveTextContent('Finish recipe');
    const checkboxs = await screen.findAllByRole('checkbox');
    expect(checkboxs).toHaveLength(3);
    checkboxs.forEach((checkbox) => {
      userEvent.click(checkbox);
    });
    userEvent.click(btn);
    const url = history.location.pathname;
    expect(url).toBe('/done-recipes');
    const btns = screen.getAllByRole('button');
    userEvent.click(btns[4]);
    expect(btns[4]).toHaveTextContent('Link copied!');
  });
  it('Testing if the button is disable ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drink),
    });
    renderWithRouter(<App />, '/drinks/178319/in-progress');
    const checkboxs = await screen.findAllByRole('checkbox');
    checkboxs.forEach((checkbox) => {
      userEvent.click(checkbox);
    });
    userEvent.click(checkboxs[0]);
  });
});
