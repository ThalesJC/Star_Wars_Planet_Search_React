import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { mock } from './mock/index';
import userEvent from '@testing-library/user-event';

describe('testes unitarios projeto starwars', () => {
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

  test('Existe um titulo na pagina?', () => { 
    const titleEl = screen.getByRole('heading', {name: /projeto Star Wars - Trybe/i});
    expect(titleEl).toBeInTheDocument();
    });
  
    test('Existe um input que ao digitar, ele busca por nome', async () => {
    const inputSearchEl = screen.getByTestId("name-filter");
    expect(inputSearchEl).toBeInTheDocument();
  
    userEvent.type(inputSearchEl, 'naboo');
    const searchResults = await  screen.findByRole('cell', { name: /naboo/i });
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
    userEvent.click(filterButton);
    });
  
    test('interage com a busca numerica', async () => {
      const columnEl = screen.getByRole("combobox", { name: /coluna/i });
      const operatorEl = screen.getByRole("combobox", { name: /operador/i});
      const valueElInput = screen.getByRole("spinbutton", { name: /valor/i });
      const filterButton = screen.getByRole("button", {name: /filtrar/i});


  
      userEvent.selectOptions(columnEl, "surface_water");
      userEvent.selectOptions(operatorEl, "igual a");
      userEvent.type(valueElInput, "40");
      userEvent.click(filterButton);
      const searchResult01 = await screen.findByRole('cell', {  name: /alderaan/i})
      expect(searchResult01).toBeInTheDocument();
      
      userEvent.selectOptions(columnEl, "population");
      userEvent.selectOptions(operatorEl, "maior que");
      userEvent.type(valueElInput, "200000");
      userEvent.click(filterButton);
      const searchResult02 = await screen.findByRole('cell', {  name: /bespin/i})
      expect(searchResult02).toBeInTheDocument();

      userEvent.selectOptions(columnEl, "rotation_period");
      userEvent.selectOptions(operatorEl, "menor que");
      userEvent.type(valueElInput, "20");
      userEvent.click(filterButton);
      const searchResult03 = await screen.findByRole('cell', {  name: /endor/i})
      expect(searchResult03).toBeInTheDocument();
    });
});
