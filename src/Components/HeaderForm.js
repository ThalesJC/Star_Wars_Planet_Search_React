import React, { useEffect, useContext, useState } from 'react';
import fetchPlanets from '../services/FetchAPI';
import StarwarsContext from '../context/StarwarsContext';

function Header() {
  const [column, setColumn] = useState('population');
  const [comparison, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columnOptions, setOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const { data, setData, filterByName: { name }, setName,
    setNumericValues, multiple, setMultiple, order, setOrder,
  } = useContext(StarwarsContext);

  const operador = ['maior que', 'menor que', 'igual a'];

  const orderFilter = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  useEffect(() => {
    fetchPlanets().then((element) => {
      element.results.map((planeta) => (
        delete planeta.residents
      ));
      const nomagicnumber = -1;
      setData(element.results.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } if (a.name < b.name) {
          return nomagicnumber;
        } return 0;
      }));
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

  const removeFilter = (parametro) => {
    const deleteFilter = [...multiple];
    deleteFilter.splice(multiple.indexOf(parametro), 1);
    setMultiple(deleteFilter);
    setOptions([
      ...columnOptions,
      parametro,
    ]);
  };

  const removeAllFilters = () => {
    setOptions([
      ...columnOptions,
      ...multiple.map((el) => el.column),
    ]);
    setMultiple([]);
  };

  const renderFilters = () => (
    <section>
      <h3>Filtros aplicados!</h3>
      {multiple.map((el, i) => (
        <div data-testid="filter" key={ i }>
          <p>{ `${el.column}, ${el.comparison} ${el.value}` }</p>
          <button onClick={ () => removeFilter(el.column) } type="button">Excluir</button>
        </div>
      ))}
    </section>
  );

  const onSortChange = ({ target }) => {
    setOrder({
      ...order,
      [target.name]: target.value,
    });
  };

  const onHandleClick = () => {
    const unknownFilter = (el) => el[order.column] === 'unknown';
    const unknownElements = data.filter(unknownFilter);
    const elements = data.filter((planet) => !unknownFilter(planet)).sort((a, b) => (
      order.sort === 'ASC'
        ? a[order.column] - b[order.column] : b[order.column] - a[order.column]));
    setData([...elements, ...unknownElements]);
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
          <select
            name="column"
            onChange={ onSortChange }
            data-testid="column-sort"
            id="ordenar"
          >
            {orderFilter.map((el, i) => (
              <option key={ i }>{el}</option>
            ))}
          </select>
        </label>

        <div>
          <label htmlFor="ascendente">
            Ascendente
            <input
              data-testid="column-sort-input-asc"
              value="ASC"
              type="radio"
              name="sort"
              onChange={ onSortChange }
            />
          </label>
          <label htmlFor="descentente">
            Descentente
            <input
              data-testid="column-sort-input-desc"
              value="DESC"
              type="radio"
              name="sort"
              onChange={ onSortChange }
            />
          </label>
        </div>

        <button
          onClick={ onHandleClick }
          data-testid="column-sort-button"
          type="button"
        >
          ORDENAR
        </button>

        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ removeAllFilters }
        >
          REMOVER FILTROS
        </button>
      </section>
      { multiple.length > 0 && renderFilters()}
    </header>
  );
}

export default Header;
