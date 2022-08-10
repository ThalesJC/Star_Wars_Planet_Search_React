import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';


describe('testes unitarios projeto starwars', () => {
  beforeEach(() => {
      jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
          json: () => Promise.resolve(testData)
        }));
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
  
    userEvent.type(inputSearchEl, 'oo');
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
  
    test('Testa se é possivel aplicar mais de um filtro, e os apaga', async () => {
      const columnEl = screen.getByRole("combobox", { name: /coluna/i });
      const operatorEl = screen.getByRole("combobox", { name: /operador/i});
      const valueElInput = screen.getByRole("spinbutton", { name: /valor/i });
      const filterButton = screen.getByRole("button", {name: /filtrar/i});
      const deleteAllBtn = screen.getByRole("button", { name: /remover filtros/i });

      userEvent.selectOptions(columnEl, "diameter");
      userEvent.selectOptions(operatorEl, "maior que");
      userEvent.type(valueElInput, "9000");
      userEvent.click(filterButton);
      
      userEvent.selectOptions(columnEl, "population");
      userEvent.selectOptions(operatorEl, "menor que");
      userEvent.type(valueElInput, "1000000");
      userEvent.click(filterButton);

      const searchResult02 = await screen.findByRole('cell', {  name: /tatooine/i})
      const searchResult01 = await screen.findByRole('cell', {  name: /yavin iv/i})
      const deleteBtnEl = screen.getAllByRole("button", { name: /excluir/i});

      expect(searchResult01).toBeInTheDocument();
      expect(searchResult02).toBeInTheDocument();
      expect(deleteBtnEl).toHaveLength(2);
      expect(deleteAllBtn).toBeInTheDocument();

      userEvent.click(deleteBtnEl[1]);

      const deleteBtnAfterClick = screen.getAllByRole("button", { name: /excluir/i});

      expect(deleteBtnAfterClick).toHaveLength(1);

      userEvent.click(deleteAllBtn);

      
    });
    test('Adicione um filtro e verifique se a tabela foi atualizada com as informações filtradas', async () => {
      const columnEl = screen.getByRole("combobox", { name: /coluna/i });
      const operatorEl = screen.getByRole("combobox", { name: /operador/i});
      const valueElInput = screen.getByRole("spinbutton", { name: /valor/i });
      const filterButton = screen.getByRole("button", {name: /filtrar/i});
  
      userEvent.selectOptions(columnEl, "orbital_period");
      userEvent.selectOptions(operatorEl, "igual a");
      userEvent.type(valueElInput, "368");
      userEvent.click(filterButton);

      const searchResult01 = await screen.findByRole('cell', {  name: /coruscant/i});
      expect(searchResult01).toBeInTheDocument();
    });
    test('verifica a ordem inicial dos planetas', () => {
      const applyOrderBtn = screen.getByRole('button', { name: /ordenar/i });
      userEvent.click(applyOrderBtn);

    });
    test('verifica se é possivel ordenar em ordem CRESCENTE', () => {
      const orderBtn = screen.getByRole('combobox', {  name: /ordenar/i});
      const ascRadio = screen.getByTestId('column-sort-input-asc');
      const applyOrderBtn = screen.getByRole('button', { name: /ordenar/i });

      userEvent.selectOptions(orderBtn, 'diameter');
      userEvent.click(ascRadio);
      userEvent.click(applyOrderBtn);

      expect(orderBtn).toBeInTheDocument();
      expect(ascRadio).toBeInTheDocument();
      expect(applyOrderBtn).toBeInTheDocument();
    });
    test('Verifica se é possivel ordenar em ordem DECRESCENTE', () => {
      const orderBtn = screen.getByRole('combobox', {  name: /ordenar/i});
      const descRadio = screen.getByTestId('column-sort-input-desc');
      const applyOrderBtn = screen.getByRole('button', { name: /ordenar/i });

      userEvent.selectOptions(orderBtn, 'population');
      userEvent.click(descRadio);
      userEvent.click(applyOrderBtn);
    });
});
