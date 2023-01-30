import './App.css';

import React from 'react';

import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';

const App = () => {
  return (
    <div className="App">
      <h1>Meals Application</h1>
      <Search />
      <Favorites />
      <Meals />
      <Modal />
    </div>
  );
}

export default App;
