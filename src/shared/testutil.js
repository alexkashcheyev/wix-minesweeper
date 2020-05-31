import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import config from '../appconfig';

export function wrapComponent(unwrapped, state) {

    const store = configureStore([])(state);

    const component = (
        <Provider store={store}>
            {unwrapped}
        </Provider>
    );

    return { store, component };
}

export function countCells(field, test) {
    return field.reduce(
        (total, column) => {
            return total + column.reduce(
                (subTotal, cell) => {
                    return subTotal + (test(cell) ? 1 : 0)
                },
                0
            )
        },
        0
    );
}

export function createField(template) {


    // *        is mine
    // F        is flag
    // E        is flag on mine
    // number   is mines around

    const res = [];

    for (let y in template) {
        
        for (let x in template[y]) {

            if (typeof(res[x]) === 'undefined') {
                res[x] = [];
            }

            const token = template[y].charAt(x);

            res[x][y] = {
                isOpened: false,
                hasMine: token === '*' || token === 'E',
                isFlagged: token === 'F' || token === 'E',
                minesAround: token === '*' ? null : (parseInt(token) || 0)
            }
        }
    }

    return res;
}

export function createViewport(
    offsetx = 0, 
    offsety = 0, 
    width = config.viewportWidth, 
    height = config.viewportHeight
) {
    return {
        width, height,
        offset: {
            x: offsetx,
            y: offsety
        }
    }
}

export function createGameInfo(
    width,
    height,
    mines = 1
) {
    return {
        width, height, mines
    }
}