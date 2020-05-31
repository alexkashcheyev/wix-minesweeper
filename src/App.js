import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';

import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Message from './components/Message';
import Viewport from './components/Viewport';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    position: 'relative'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Navbar />
      <Menu />
      <Box className={classes.box}>
        <Container className={classes.container}>
          <Viewport />
        </Container>
        <Message />
      </Box>
    </div>
  );
}

//<div>Icons made by <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default App;
