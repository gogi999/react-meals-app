import './App.css';

import React from 'react';

import Meals from './components/Meals';
/*
import Favorites from './components/Favorites';
import Modal from './components/Modal';
*/
import Search from './components/Search';

const App = () => {
  return (
    <main>
      <Search />
      {/* <Favorites />  */}
      <Meals />
      {/* <Modal /> */}
    </main>
  );
}

export default App;
