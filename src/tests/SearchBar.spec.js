import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { rice, meal, drinksRecomendation, drink, mealRecommendation } from './helpers/mock/recipeMock';
import { renderWithRouterAndContext } from './helpers/renderWith';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

const noRecipe = {
  meals: null,
};

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
describe('Testa o componente SearchBar da aplicação App de Receitas ', () => {
  beforeEach(() => {
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});
  });
  afterEach(() => {
    global.fetch.mockClear();
  });
  test('Testa se é feita uma pesquisa na API quando é buscado uma receita por ingrediente ', async () => {
    // Colocar da linha 18 até a 29 em todos os testes que serão feitos
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(meals)
        // Mudar o valor desse 'mockResolvedValue' para o retorno da api que tu tiver testando na hora de procurar
        .mockResolvedValue(rice),
    });
    const recipesNames = rice.meals.map((recipes) => recipes.strMeal);
    const { history } = renderWithRouterAndContext(<App />);
    act(() => { history.push('/meals'); });

    const unlockSearchBarBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(unlockSearchBarBtn);

    const inputSearch = screen.getByTestId(searchInput);
    userEvent.type(inputSearch, 'rice');
    expect(inputSearch).toBeInTheDocument();

    const radioInput = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioInput);
    expect(radioInput).toBeInTheDocument();

    const buttonSearch = screen.getByRole('button', { name: 'SEARCH' });
    userEvent.click(buttonSearch);
    expect(buttonSearch).toBeInTheDocument();

    const names = await screen.findAllByRole('heading', { level: 3 });
    expect(names).toHaveLength(10);
    names.forEach((name, index) => {
      expect(name).toHaveTextContent(recipesNames[index]);
      expect(name).toHaveAttribute('data-testid', `${index}-card-name`);
    });
    // Lembra de colocar async no test e usar o await find, tá demorando pra renderizar na tela a pesquisa e os botões de categoria, então tem usar pra poder achar
  });

  test('Testa se ao procurar uma receita que não existe ele renderiza o alerta: Sorry, we haven\'t found any recipes for these filters.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(meals)
        // Mudar o valor desse 'mockResolvedValue' para o retorno da api que tu tiver testando na hora de procurar
        .mockResolvedValue(noRecipe),
    });
    const { history } = renderWithRouterAndContext(<App />);
    act(() => { history.push('/meals'); });

    const unlockSearchBarBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(unlockSearchBarBtn);

    const inputSearch = screen.getByTestId(searchInput);
    userEvent.type(inputSearch, 'arroz');
    expect(inputSearch).toBeInTheDocument();

    const radioInput = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioInput);
    expect(radioInput).toBeInTheDocument();

    const buttonSearch = screen.getByRole('button', { name: 'SEARCH' });
    userEvent.click(buttonSearch);
    expect(buttonSearch).toBeInTheDocument();

    const names = screen.queryAllByRole('heading', { level: 3 });
    expect(names).toHaveLength(0);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });

    // Testes que envolvam o alert aparecer na tela.
    // expect(global.alert).toHaveBeenCalled();
    // expect(global.alert).toHaveBeenCalledWith('');
  });

  test('Testa se ao procurar por mais de uma letra em First Letter renderiza um alerta: ', async () => {
    // Colocar da linha 18 até a 29 em todos os testes que serão feitos
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(meals),
      // Mudar o valor desse 'mockResolvedValue' para o retorno da api que tu tiver testando na hora de procurar
    });

    const { history } = renderWithRouterAndContext(<App />);
    act(() => { history.push('/meals'); });

    const unlockSearchBarBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(unlockSearchBarBtn);

    const inputSearch = screen.getByTestId(searchInput);
    userEvent.type(inputSearch, 'as');
    expect(inputSearch).toBeInTheDocument();

    const radioInput = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radioInput);
    expect(radioInput).toBeInTheDocument();

    const buttonSearch = screen.getByRole('button', { name: 'SEARCH' });
    userEvent.click(buttonSearch);
    expect(buttonSearch).toBeInTheDocument();

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });

  test('Testa se a página de MEALS é redirecionada para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL  ', async () => {
    // Colocar da linha 18 até a 29 em todos os testes que serão feitos
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(meals)
        // Mudar o valor desse 'mockResolvedValue' para o retorno da api que tu tiver testando na hora de procurar
        .mockResolvedValueOnce(meal)
        .mockResolvedValueOnce(meal)
        .mockResolvedValue(drinksRecomendation),
    });
    const { history } = renderWithRouterAndContext(<App />);
    act(() => { history.push('/meals'); });

    const unlockSearchBarBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(unlockSearchBarBtn);

    const inputSearch = screen.getByTestId(searchInput);
    userEvent.type(inputSearch, 'Penne');
    expect(inputSearch).toBeInTheDocument();

    const radioInput = screen.getByTestId('name-search-radio');
    userEvent.click(radioInput);
    expect(radioInput).toBeInTheDocument();

    const buttonSearch = screen.getByRole('button', { name: 'SEARCH' });
    userEvent.click(buttonSearch);
    expect(buttonSearch).toBeInTheDocument();
    const detailsPage = await screen.findByRole('heading', { name: 'Spicy Arrabiata Penne' });
    expect(detailsPage).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52771');
  });

  test('Testa se a página de DRINKS é redirecionada para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL ', async () => {
    // Colocar da linha 18 até a 29 em todos os testes que serão feitos
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(meals)
        // Mudar o valor desse 'mockResolvedValue' para o retorno da api que tu tiver testando na hora de procurar
        .mockResolvedValueOnce(drink)
        .mockResolvedValueOnce(drink)
        .mockResolvedValue(mealRecommendation),
    });
    const { history } = renderWithRouterAndContext(<App />);
    act(() => { history.push('/drinks'); });

    const unlockSearchBarBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(unlockSearchBarBtn);

    const inputSearch = screen.getByTestId(searchInput);
    userEvent.type(inputSearch, 'Aquamarine');
    expect(inputSearch).toBeInTheDocument();

    const radioInput = screen.getByTestId('name-search-radio');
    userEvent.click(radioInput);
    expect(radioInput).toBeInTheDocument();

    const buttonSearch = screen.getByRole('button', { name: 'SEARCH' });
    userEvent.click(buttonSearch);
    expect(buttonSearch).toBeInTheDocument();
    const detailsPage = await screen.findByRole('heading', { name: 'Aquamarine' });
    expect(detailsPage).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
  });
});
