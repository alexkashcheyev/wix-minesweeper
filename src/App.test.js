import React from 'react';

import { wrapComponent } from './shared/testutil';
import App from './App.js';
import { initialState } from './redux/store';

describe('App component', () => {

  it('Should create', () => {
  
    const { component, store } = wrapComponent(<App />, initialState);
    
    expect(component).toBeTruthy();
  
  });

});