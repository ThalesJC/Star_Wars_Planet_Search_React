import React from 'react';
import './App.css';
import Provider from './context/myProvider';
import Table from './Components/Table';
import Header from './Components/HeaderForm';

function App() {
  return (
    <Provider>
      <Header />
      <Table />
    </Provider>
  );
}

export default App;
