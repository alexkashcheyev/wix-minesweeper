import React from 'react';
import { createStore } from 'redux';
import { gameStage, actionType } from '../enums';
import { validViewport, validViewportChange } from '../shared/viewport';
import { clone } from 'lodash';

const intialState = {
    ui: {
        showMenu: false,
        message: {
            severity: 'info',
            visible: false,
            title: '',
            content: ''
        }
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
            const { x, y } = action.payload;
            const { field, flagsSet, gameInfo } = state.currentGame;
            
            // Can't flag an opened cell
            if (field[x][y].isOpened) return state;
            
            // Taking the flag off
            if (field[x][y].isFlagged) {
                const newField = clone(field);
                newField[x][y].isFlagged = false;

                return {
                    ...state,
                    currentGame: {
                        ...state.currentGame,
                        flagsSet: flagsSet - 1,
                        field: newField
                    }
                }
            }

            // Show message if no flags left
            if (flagsSet === gameInfo.mines) {
                return {
                    ...state,
                    ui: {
                        ...state.ui,
                        message: {
                            visible: true,
                            severity: 'warning',
                            title: 'No flags left',
                            content: 'You had just enough flags to flag all the mines.'
                        }
                    }
                }
            }

            // At this point we will need to update the field

            const newField = clone(field);
            newField[x][y].isFlagged = true;
            let newMessage = { visible: false }

            // are all the mines flagged?

            if (
                // all the flags are set
                flagsSet + 1 === gameInfo.mines

                // and no flagged cells without mines exist
                && !newField.find(
                    (column, x) => column.find(
                        (cell, y) => cell.isFlagged && !cell.hasMine
                    )
                )
            ) {
                newMessage = {
                    visible: true,
                    title: 'Congratulations!',
                    content: 'You win!',
                    severity: 'success'
                }
            }

            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    field: newField,
                    flagsSet: flagsSet + 1
                },
                ui : {
                    ...state.ui,
                    message: {
                        ...state.ui.message,
                        ...newMessage
                    }
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

        case actionType.TOGGLE_MESSAGE: {

            return {
                ...state,
                ui: {
                    ...state.ui,
                    message: action.payload
                }
            }
            
        }
    }

    return state;
}

export const store = createStore(rootReducer)