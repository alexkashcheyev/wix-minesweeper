import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import { Box, Container } from '@material-ui/core';
import GameField from './components/GameField';
import { makeStyles } from '@material-ui/core'
import Viewport from './components/Viewport';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    marginTop: '10rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Navbar />
      <Menu />
      <Container className={classes.container}>
        <Viewport />
      </Container>
    </div>
  );
}

//<div>Icons made by <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default App;
