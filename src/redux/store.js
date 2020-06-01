import { createStore, applyMiddleware } from 'redux';
import { gameStage, actionType } from '../enums';
import createSagaMiddleware from 'redux-saga';
import toggleFlagSaga from '../sagas/toggleFlagSaga';
import generateFieldSaga from '../sagas/generateFieldSaga';
import changeOffsetSaga from '../sagas/changeOffsetSaga';
import openCellSaga from '../sagas/openCellSaga';
import { fork, all } from 'redux-saga/effects';
import config from '../appconfig';

export const initialState = {
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
            width: 15,
            height: 15,
            mines: 10
        },
        viewport: {
            width: config.viewportWidth,
            height: config.viewportHeight,
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
            width: 300,
            height: 300,
            mines: 1
        }
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.TOGGLE_MENU:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    showMenu: action.payload.show
                }
            }

        case actionType.TOGGLE_SUPERMAN:
            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    superman: action.payload.superman
                }
            }

        case actionType.SET_NEW_GAME_PARAMETER:
            return {
                ...state,
                newGame: {
                    ...state.newGame,
                    gameInfo: {
                        ...state.newGame.gameInfo,
                        [action.payload.key]: action.payload.value
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
                    stage: gameStage.LOADING,
                    viewport: {
                        ...state.currentGame.viewport,
                        offset: {
                            x: 0,
                            y: 0
                        }
                    }
                },
            }

        case actionType.SET_MESSAGE: {

            return {
                ...state,
                ui: {
                    ...state.ui,
                    message: action.payload
                }
            }
            
        }

        case actionType.SET_FIELD: {

            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    field: action.payload.field
                }
            }
        }

        case actionType.UPDATE_FLAG_COUNT: {
            
            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    flagsSet: state.currentGame.flagsSet + action.payload.delta
                }
            }
        }

        case actionType.SET_VIEWPORT_OFFSET: {

            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    viewport: {
                        ...state.currentGame.viewport,
                        offset: action.payload.offset                        
                    }
                }
            }
        }

        case actionType.SET_GAME_STAGE: {
            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    stage: action.payload.stage
                }
            }
        }

        case actionType.SET_VIEWPORT_SIZE: {
            return {
                ...state,
                currentGame: {
                    ...state.currentGame,
                    viewport: {
                        ...viewport,
                        ...action.payload
                    }
                }
            }
        }

        default: return state;
    }
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware)
);

function* rootSaga () {
    yield all([
        fork(toggleFlagSaga),
        fork(generateFieldSaga),
        fork(changeOffsetSaga),
        fork(openCellSaga)
    ]);
}

sagaMiddleware.run(rootSaga);