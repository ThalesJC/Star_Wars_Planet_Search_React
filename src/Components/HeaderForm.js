import React, { useEffect, useContext } from 'react';
import fetchPlanets from '../services/FetchAPI';
import StarwarsContext from '../context/StarwarsContext';

function Header() {
  const { data, setData } = useContext(StarwarsContext);

  useEffect(() => {
    fetchPlanets().then((element) => {
      element.results.map((planeta) => (
        delete planeta.residents
      ));
      setData(element.results);
    });
  }, [setData]);

  console.log(data);

  return (
    <>
      <h1>Projeto Star Wars - Trybe</h1>
      <input type="text" placeholder="Pesquisar" data-testid="name-filter" />
      <div>
        <label htmlFor="coluna">
          Coluna
          <select id="coluna" data-testid="column-filter">
            <option>exemplo</option>
          </select>
        </label>

        <label htmlFor="operador">
          Operador
          <select id="operador" data-testid="comparison-filter">
            <option>exemplo</option>
          </select>
        </label>

        <input type="number" data-testid="value-filter" />

        <button type="button" data-testid="button-filter">FILTRAR</button>

        <label htmlFor="ordenar">
          Ordenar
          <select id="ordenar">
            <option>exemplo</option>
          </select>
        </label>

        <div>
          <label htmlFor="ascendente">
            Ascendente
            <input type="radio" />
          </label>
          <label htmlFor="descentente">
            Descentente
            <input type="radio" />
          </label>
        </div>

        <button type="button">ORDENAR</button>

        <button type="button">REMOVER FILTROS</button>
      </div>
    </>
  );
}

export default Header;
