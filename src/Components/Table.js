import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Table() {
  const { data, filterByName: { name }, multiple } = useContext(StarwarsContext);
  const options = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate',
    'gravity', 'terrain', 'surface_water', 'population', 'films', 'created', 'edited',
    'url'];

  const render = () => (
    data.filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()))
      .filter((planet) => multiple.every(({
        column: coluna,
        comparison: comparacao,
        value: valor }) => {
        switch (comparacao) {
        case 'maior que':
          return Number(planet[coluna]) > valor;

        case 'menor que':
          return Number(planet[coluna]) < valor;

        default:
          return planet[coluna] === valor;
        }
      }))
      .map((planet) => (
        <tr key={ planet.name }>
          { options.map((cell, index) => (
            <td key={ `${index}_${cell}` }>
              { planet[cell] }
            </td>
          )) }
        </tr>
      ))
  );

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Filme</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { render() }
      </tbody>
    </table>
  );
}

export default Table;
