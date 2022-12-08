import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { rice } from './helpers/mock/recipeMock';
import { renderWithRouterAndContext } from './helpers/renderWith';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

describe('Testa o componente SearchBar da aplicação App de Receitas ', () => {
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

    const unlockSearchBarBtn = screen.getByTestId('search-top-btn');
    userEvent.click(unlockSearchBarBtn);

    const inputSearch = screen.getByTestId('search-input');
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
});
