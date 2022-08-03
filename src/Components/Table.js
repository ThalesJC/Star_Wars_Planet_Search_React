import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Table() {
  const { data, filterByName: { name }, filterByNumericValues:
{ column, comparison, value } } = useContext(StarwarsContext);
  const options = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate',
    'gravity', 'terrain', 'surface_water', 'population', 'films', 'created', 'edited',
    'url'];

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
        { data.filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()))
          .filter((planet) => {
            switch (comparison) {
            case 'maior que':
              return Number(planet[column]) > value;

            case 'menor que':
              return Number(planet[column]) < value;

            default:
              return planet[column] === value;
            }
          })
          .map((planet) => (
            <tr key={ planet.name }>
              { options.map((cell, index) => (
                <td key={ `${index}_${cell}` }>
                  { planet[cell] }
                </td>
              )) }
            </tr>
          )) }
      </tbody>
    </table>
  );
}

export default Table;
