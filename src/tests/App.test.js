import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { mock } from './mock/index';
// import userEvent from '@testing-library/user-event';

describe('01-testa o fetch da aplicação', () => {
  
  beforeEach(() => {
    const fetchApi = () => {
      jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
          json: () => Promise.resolve(mock)
        }));
    }
    render(<App />);
  });
  afterEach(() => jest.clearAllMocks());

  test('fetch planets', async () => {
    
    const planetMocked = await screen.findByRole('cell', { name: /tatooine/i})
    expect(planetMocked).toBeInTheDocument();
  });
});

describe('02-testa o componente Header', () => {
  beforeEach(() => {
    render(<App />);
  })
  test('Existe um titulo na pagina?', () => {
    
  const titleEl = screen.getByRole('heading', {name: /projeto Star Wars - Trybe/i});
  expect(titleEl).toBeInTheDocument();
  });
  test('Existe um input que ao digitar, ele busca por nome', async () => {
  const inputSearchEl = screen.getByTestId("name-filter");
  expect(inputSearchEl).toBeInTheDocument();

  userEvent.type(inputSearchEl, 'naboo');
  const searchResults = await  screen.getByText(/naboo/i);
  expect(searchResults).toBeInTheDocument();
  });
  test('Existe um select que filtra por coluna?', () => {
  const columnSearchEl = screen.getByTestId("column-filter");
  expect(columnSearchEl).toBeInTheDocument();
  });
  test('Existe um select para selecionar um operador de busca?', () => {
  const comparisonSelect = screen.getByTestId("comparison-filter");
  expect(comparisonSelect).toBeInTheDocument();
  });
  test('Existe um input numerico?', () => {
  const numberInput = screen.getByTestId("value-filter");
  expect(numberInput).toBeInTheDocument();
  });
  test('Existe um botão que ao ser clicado filtra os planetas de acordo com os paremetros inseridos', () => {
  const filterButton = screen.getByRole("button", {name: /filtrar/i});
  expect(filterButton).toBeInTheDocument();
  });
});

// describe('03-testa o componente Table', () => {});
