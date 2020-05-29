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
    const field = generateField(gameInfo);

    return {
        type: actionType.START_GAME,
        payload: {
            gameInfo,
            field
        }
    }
}

export const toggleFlag = (x, y, value) => ({
    type: actionType.TOGGLE_FLAG,
    payload: { x, y, value }
});

export const openCells = (x, y, field) => {
    const newField = openCellsFrom(x, y, field);

    return {
        type: actionType.OPEN_CELLS,
        payload: { field: newField }
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