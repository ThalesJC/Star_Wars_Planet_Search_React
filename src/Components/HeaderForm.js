import React, { useEffect, useContext, useState } from 'react';
import fetchPlanets from '../services/FetchAPI';
import StarwarsContext from '../context/StarwarsContext';

function Header() {
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);

  const { setData, filterByName: { name }, setName,
    setNumericValues } = useContext(StarwarsContext);
  const columnOpts = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const operador = ['maior que', 'menor que', 'igual a'];

  useEffect(() => {
    fetchPlanets().then((element) => {
      element.results.map((planeta) => (
        delete planeta.residents
      ));
      setData(element.results);
    });
  }, [setData]);

  const filterClick = () => {
    setNumericValues({
      column,
      comparison: operator,
      value,
    });
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
          <select
            id="coluna"
            value={ column }
            onChange={ ({ target }) => setColumn(target.value) }
            data-testid="column-filter"
          >
            { columnOpts.map((opt, index) => (
              <option key={ index } value={ opt }>{opt}</option>
            ))}
          </select>
        </label>

        <label htmlFor="operador">
          Operador
          <select
            id="operador"
            value={ operator }
            onChange={ ({ target }) => setOperator(target.value) }
            data-testid="comparison-filter"
          >
            {
              operador.map((opt, index) => (
                <option key={ index } value={ opt }>{opt}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="number">
          valor
          <input
            value={ value }
            onChange={ ({ target }) => setValue(target.value) }
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
            <input type="radio" name="order" />
          </label>
          <label htmlFor="descentente">
            Descentente
            <input type="radio" name="order" />
          </label>
        </div>

        <button type="button">ORDENAR</button>

        <button type="button">REMOVER FILTROS</button>
      </section>
    </header>
  );
}

export default Header;
