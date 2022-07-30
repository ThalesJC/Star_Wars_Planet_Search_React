import React, { useEffect, useContext } from 'react';
import fetchPlanets from '../services/FetchAPI';
import StarwarsContext from '../context/StarwarsContext';

function Header() {
  const { setData, filterByName: { name }, setName } = useContext(StarwarsContext);
  const column = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  useEffect(() => {
    fetchPlanets().then((element) => {
      element.results.map((planeta) => (
        delete planeta.residents
      ));
      setData(element.results);
    });
  }, [setData]);

  const filterClick = () => {
    console.log('Ola');
  };

  return (
    <header>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        value={ name }
        onChange={ ({ target }) => setName({ name: target.value }) }
        type="text"
        placeholder="Pesquisar"
        data-testid="name-filter"
      />
      <section>
        <label htmlFor="coluna">
          Coluna
          <select id="coluna" data-testid="column-filter">
            { column.map((opt, index) => (
              <option key={ index }>{opt}</option>
            ))}
          </select>
        </label>

        <label htmlFor="operador">
          Operador
          <select id="operador" data-testid="comparison-filter">
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>

          </select>
        </label>

        <label htmlFor="number">
          valor
          <input
            id="number"
            type="number"
            placeholder="digite algum valor"
            data-testid="value-filter"
          />
        </label>

        <button
          type="button"
          onClick={ filterClick }
          data-testid="button-filter"
        >
          FILTRAR
        </button>

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
      </section>
    </header>
  );
}

export default Header;
