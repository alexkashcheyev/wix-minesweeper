import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { initialState } from '../redux/store';
import Viewport from "./Viewport"
import { gameStage } from '../enums';


describe('Viewport component', () => {
    const mockStore = configureStore([]);
    let store;
    let tr;
    let component;
    
    const wrappedJsx = (store) => (
        <Provider store={store}>
            <Viewport />
        </Provider>
    )
    
    const update = () => {
        act(
            () => {
                tr.update(wrappedJsx(store));
            }
        )
        component = tr.toJSON();
    }

    beforeEach(() => {
        store = mockStore(initialState);

        act(() => {
            tr = TestRenderer.create(wrappedJsx(store));
        });

        component = tr.toJSON();
    })    
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show text if game was not started', () => {
        expect(component).toMatchSnapshot();
    });

    it('should show only flag count if game has started, and game field fits', () => {
        store = mockStore({
            ...initialState,
            currentGame: {
                ...initialState.currentGame,
                stage: gameStage.STARTED,
                gameInfo: {
                    ...initialState.currentGame.gameInfo,
                    width: 5,
                    height: 5
                },
                viewport: {
                    ...initialState.currentGame.viewport,
                    width: 10,
                    height: 10
                }
            },
        });

        update();

        expect(component).toMatchSnapshot();
    });

    it('should also show minimap and navigation keys if game does not fit', () => {
        store = mockStore({
            ...initialState,
            currentGame: {
                ...initialState.currentGame,
                stage: gameStage.STARTED,
                gameInfo: {
                    ...initialState.currentGame.gameInfo,
                    width: 10,
                    height: 10
                },
                viewport: {
                    ...initialState.currentGame.viewport,
                    width: 5,
                    height: 5
                }
            },
        });

        update();

        expect(component).toMatchSnapshot();
    });

})

// for debugging this file:
// node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand viewport.test.js