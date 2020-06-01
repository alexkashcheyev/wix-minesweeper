import { actionType } from '../enums';
import { act } from 'react-test-renderer';

// request to show or hide the menu
export const toggleMenu = (show) => ({
    type: actionType.TOGGLE_MENU,
    payload: { show }
});

// set superman mode to given value
export const toggleSuperman = (superman) => ({
    type: actionType.TOGGLE_SUPERMAN,
    payload: { superman }
});

// set new game parameter, which is 'width', 'height' or 'mines'
// to given value, if valid
export const setNewGameParameter = (key, value) => ({
    type: actionType.SET_NEW_GAME_PARAMETER,
    payload: { key, value }
});

// request starting game
export const startGame = (gameInfo) => ({
    type: actionType.START_GAME,
    payload: { gameInfo }
})

// set or unset flag on given cell
export const toggleFlag = (x, y) => ({
    type: actionType.TOGGLE_FLAG,
    payload: { x, y }
});

// request opening a cell
export const openCell = (x, y) => ({
    type: actionType.OPEN_CELL,
    payload: { x, y }
})

// request to move the viewport to see different part of the field
export const moveViewport = (dx, dy) => ({
    type: actionType.MOVE_VIEWPORT,
    payload: { dx, dy }
})

// show/hide the alert with given data
export const setMessage = (visible, severity='info', title='', content='') => ({
    type: actionType.SET_MESSAGE,
    payload: { severity, visible, title, content }
})

// set the game field as a reflection
// of user's actions
export const setField = (field) => ({
    type: actionType.SET_FIELD,
    payload: { field }
})

// increase flags count by given number
export const changeSetFlags = (delta) => ({
    type: actionType.UPDATE_FLAG_COUNT,
    payload: { delta }
})

// actually set the viewport offset
export const setViewportOffset = (offset) => ({
    type: actionType.SET_VIEWPORT_OFFSET,
    payload: { offset }
})

// move game to another stage
export const setGameStage = (stage) => ({
    type: actionType.SET_GAME_STAGE,
    payload: { stage }
})

export const setViewportSize = (width, height) => ({
    type: actionType.SET_VIEWPORT_SIZE,
    payload: { width, height }
})