import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import { Box } from '@material-ui/core';


function App() {
  return (
    <div className="App">
        <Navbar />
        <Menu />
    </div>
  );
}

export default App;
