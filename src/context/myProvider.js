import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarwarsContext from './StarwarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setName] = useState({ name: '' });

  const state = {
    data,
    setData,
    filterByName,
    setName,
  };

  return (
    <StarwarsContext.Provider value={ state }>
      { children }
    </StarwarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
