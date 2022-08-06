import React, { useEffect, useContext, useState } from 'react';
import fetchPlanets from '../services/FetchAPI';
import StarwarsContext from '../context/StarwarsContext';

function Header() {
  const [column, setColumn] = useState('population');
  const [comparison, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columnOptions, setOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const { setData, filterByName: { name }, setName,
    setNumericValues, multiple, setMultiple } = useContext(StarwarsContext);

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
      comparison,
      value,
    });
    setMultiple([
      ...multiple,
      { column,
        comparison,
        value },
    ]);
    const columnOpt = [...columnOptions];
    columnOpt.splice(columnOptions.indexOf(column), 1);
    setOptions(
      columnOpt,
    );
  };

  useEffect(() => {
    setColumn(
      columnOptions[0],
    );
  }, [columnOptions]);

  //   console.log(columnOpts);

  const renderFilters = () => (
    <section>
      <h3>Filtros aplicados!</h3>
      {multiple.map((el, i) => (
        <div key={ i }>
          <p>{ `${el.column}, ${el.comparison} ${el.value}` }</p>
          <button type="button">Excluir</button>
        </div>
      ))}
    </section>
  );

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
            { columnOptions.map((opt, index) => (
              <option key={ index } value={ opt }>{opt}</option>
            ))}
          </select>
        </label>

        <label htmlFor="operador">
          Operador
          <select
            id="operador"
            value={ comparison }
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
            onFocus={ () => setValue('') }
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
      { multiple.length > 0 && renderFilters()}
    </header>
  );
}

export default Header;
