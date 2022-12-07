import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import RecipesAppProvider from '../../context/RecipesAppProvider';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

function renderWithContext(componente) {
  return {
    ...render(
      <RecipesAppProvider>
        {componente}
      </RecipesAppProvider>,
    ),
  };
}

export function renderWithRouterAndContext(componente, options = {}) {
  const { initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = options;
  return {
    ...renderWithContext(withRouter(componente, history)),
    history,
  };
}
