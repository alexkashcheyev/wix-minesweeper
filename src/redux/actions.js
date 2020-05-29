import { actionType } from '../enums';
import { generateField, openCellsFrom } from '../shared/field';

export const toggleMenu = (show) => ({
    type: actionType.TOGGLE_MENU,
    payload: show
});

export const toggleSuperman = (value) => ({
    type: actionType.TOGGLE_SUPERMAN,
    payload: value
});

export const changeNewGameParameter = (key, value) => ({
    type: actionType.CHANGE_NEW_GAME_PARAMETER,
    payload: {
        key, value
    }
});

export const startGame = (gameInfo) => {

    return {
        type: actionType.START_GAME,
        payload: {
            gameInfo
        }
    }
}

export const toggleFlag = (x, y) => ({
    type: actionType.TOGGLE_FLAG,
    payload: { x, y }
});

export const openCell = (x, y) => {

    return {
        type: actionType.OPEN_CELLS,
        payload: { x, y }
    }
}

export const changeOffset = (dx, dy) => ({
    type: actionType.CHANGE_OFFSET,
    payload: { dx, dy }
})

export const toggleMessage = (visible, severity='info', title='', content='') => ({
    type: actionType.TOGGLE_MESSAGE,
    payload: { severity, visible, title, content }
})

export const updateField = (field) => ({
    type: actionType.UPDATE_FIELD,
    payload: { field }
})

export const updateSetFlags = (delta) => ({
    type: actionType.UPDATE_FLAG_COUNT,
    payload: { delta }
})

export const updateOffset = (offset) => ({
    type: actionType.UPDATE_OFFSET,
    payload: { offset }
})

export const changeGameStage = (stage) => ({
    type: actionType.CHANGE_GAME_STAGE,
    payload: { stage }
})