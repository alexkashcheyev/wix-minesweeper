import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider }from 'react-redux';

import { gameStage } from '../enums';
import { initialState } from '../redux/store';
import GameField from "./GameField";

describe('GameField component', () => {
    const mockStore = configureStore([]);
    let store;
    let tr;
    let component;

    const wrappedJsx = (store) => (
        <Provider store={store}>
            <GameField border={defaultBorder} />
        </Provider>
    )

    const rerender = () => {
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

    it.each`
        viewportWidth | viewportHeight | expectedWidth | expectedHeight 
        ${3}          | ${4}           | ${3}          | ${4}
        ${5}          | ${4}           | ${5}          | ${4}
        ${7}          | ${4}           | ${5}          | ${4}

        ${3}          | ${5}           | ${3}          | ${5}
        ${5}          | ${5}           | ${5}          | ${5}
        ${7}          | ${5}           | ${5}          | ${5}

        ${3}          | ${8}           | ${3}          | ${5}
        ${5}          | ${8}           | ${5}          | ${5}
        ${7}          | ${8}           | ${5}          | ${5}
    `('should take correct dimensions from viewport and/or field', ({
        viewportWidth, 
        viewportHeight, 
        fieldWidth, 
        fieldHeight, 
        expectedWidth, 
        expectedHeight
    }) => {
        
        // empty field would normally be invalid, but the 
        // component does not care about validity. 

        const field = new Array(fieldWidth)
            .fill(0)
            .map(
                () => new Array(fieldHeight).fill({...defaultCell})
            );

        const gameInfo = {
            width: 5,
            height: 5,
            mines: 1
        }
        
        store = mockStore({
            ...initialState,
            currentGame: {
                ...initialState.currentGame,
                field: field,
                gameInfo: {
                    ...initialState.currentGame.gameInfo,
                    width: fieldWidth,
                    height: fieldHeight,
                },
                viewport: {
                    ...initialState.currentGame.viewport,
                    width: viewportWidth,
                    height: viewportHeight,
                }
            }
        })

        rerender();

        expect(component).toMatchSnapshot();
        expect(component.children.length).toEqual(expectedWidth);
        for(let col of component.children) {
            expect(col.children.length).toEqual(expectedHeight);
        }
    });

});

const defaultBorder = {
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
}

const defaultCell = {
    isOpened: false,
    hasMine: false,
    isFlagged: false,
    minesAround: 0,
}