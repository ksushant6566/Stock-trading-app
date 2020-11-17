import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import CreatePortfolio from './components/CrearePortfolio';
import Portfolio from './components/Portfolio';
import { Context } from './context/context.js'

function App() {

  return (
    <div className="App">
      <Portfolio />
      <CreatePortfolio />
    </div>
  );
}

export default App;
