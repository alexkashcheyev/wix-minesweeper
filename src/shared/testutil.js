import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

export function wrapComponent(unwrapped, state) {

    const store = configureStore([])(state);

    const component = (
        <Provider store={store}>
            {unwrapped}
        </Provider>
    );

    return { store, component };
}