import React from 'react';
import { createStore } from 'redux';
import { actionType } from './actions';

const intialState = {
    ui: {
        showMenu: false,
    },
    currentGame: {
        superman: false,
    },
    newGame: {
        width: 10,
        height: 10,
        mines: 10
    }
}

const rootReducer = (state = intialState, action) => {
    switch (action.type) {

        case actionType.TOGGLE_MENU: 
            return {
                ...state,
                ui: {
                    ...state.ui,
                    showMenu: action.payload
                }
            }

        case actionType.TOGGLE_SUPERMAN:
            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    superman: action.payload
                }
            }
        
    }

    return state;
}

export const store = createStore(rootReducer)