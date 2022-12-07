// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
// import App from '../App';
// import RecipesAppProvider from '../context/RecipesAppProvider';
// import { meal, rice } from './helpers/mock/recipeMock';
// import { renderWithRouterAndContext } from './helpers/renderWith';
// import SearchBar from '../components/SearchBar';
// import mealCategories from '../../cypress/mocks/mealCategories';
// import meals from '../../cypress/mocks/meals';
// import drinks from '../../cypress/mocks/drinks';

// const fetch = require('../../cypress/mocks/fetch');

// describe('Testa o componente SearchBar da aplicação App de Receitas ', () => {
//   beforeEach(() => {
//     // global.fetch = fetch;
//     const { history } = renderWithRouterAndContext(<App />);
//     act(() => { history.push('/meals'); });
//   });

//   test('Testa se é feita uma pesquisa na API quando é buscado uma receita por ingrediente ', async () => {
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn()
//         .mockResolvedValueOnce(mealCategories)
//         .mockResolvedValueOnce(drinks)
//         .mockResolvedValueOnce(meals)
//         .mockResolvedValue(rice),
//     });

//     const a = screen.getByTestId('search-top-btn');
//     userEvent.click(a);

//     const inputSearch = screen.getByTestId('search-input');
//     userEvent.type(inputSearch, 'rice');
//     expect(inputSearch).toBeInTheDocument();

//     const radioInput = screen.getByTestId('ingredient-search-radio');
//     userEvent.click(radioInput);
//     expect(radioInput).toBeInTheDocument();

//     const buttonSearch = screen.getByRole('button', { name: 'SEARCH' });
//     userEvent.click(buttonSearch);
//     expect(buttonSearch).toBeInTheDocument();

//     // expect(await screen.findByText('Corba')).toBeInTheDocument();
//     // screen.getByRole('i');

//     // expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
//   });
// });
