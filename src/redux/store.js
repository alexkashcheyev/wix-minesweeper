import React from 'react';
import { createStore } from 'redux';
import { gameStage, actionType } from '../enums';
import { validViewport, validViewportChange } from '../shared/viewport';

const intialState = {
    ui: {
        showMenu: false,
    },
    currentGame: {
        gameInfo: {
            width: 10,
            height: 10,
            mines: 10
        },
        viewport: {
            width: 10,
            height: 10,
            offset: {
                x: 0,
                y: 0
            },
        },
        stage: gameStage.NOT_STARTED,
        superman: true,
        flagsSet: 0,
        field: []
    },
    newGame: {
        gameInfo: {
            width: 12,
            height: 12,
            mines: 12
        }
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

        case actionType.CHANGE_NEW_GAME_PARAMETER:
            return {
                ...state,
                newGame: {
                    ...state.newGame,
                    gameInfo: {
                        ...state.newGame.gameInfo,
                        [action.payload.key]: [action.payload.value]
                    }
                }
            }

        case actionType.START_GAME:
            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    ...action.payload,
                    flagsSet: 0,
                    stage: gameStage.WAITING,
                    viewport: {
                        ...state.currentGame.viewport,
                        offset: {
                            x: 0,
                            y: 0
                        }
                    }
                },
            }

        case actionType.TOGGLE_FLAG:

            // doesn't look very good
            // TODO: refactor
            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    field: state.currentGame.field.map(

                        (column, x) => {

                            return column.map(

                                (cell, y) => {
                                    if (
                                        x === action.payload.x
                                        && y === action.payload.y
                                    ) {
                                        return {
                                            ...cell,
                                            isFlagged: action.payload.value
                                        }
                                    } else {
                                        return cell;
                                    }
                                }
                            )
                        }
                    )
                }
            }

        case actionType.OPEN_CELLS:
            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    field: action.payload.field
                }
            }

        case actionType.CHANGE_OFFSET: {
            
            if (
                validViewportChange(state.currentGame.viewport, state.currentGame.gameInfo, action.payload.dx, action.payload.dy)
            ) {
                const newX = state.currentGame.viewport.offset.x + action.payload.dx;
                const newY = state.currentGame.viewport.offset.y + action.payload.dy;

                return {
                    ...state,
                    currentGame: {
                        ...state.currentGame,
                        viewport: {
                            ...state.currentGame.viewport,
                            offset: {
                                x: newX,
                                y: newY
                            }
                        }
                    }
                }
            } else {
                return state;
            }
        }
    }

    return state;
}

export const store = createStore(rootReducer)