import { act } from "react-dom/test-utils"

export const actionType = {
    TOGGLE_MENU : 'TOGGLE_MENU',
    TOGGLE_SUPERMAN: 'TOGGLE_SUPERMAN',
    CHANGE_NEW_GAME_PARAMETER: 'CHANGE_NEW_GAME_PARAMETER'
}

export const toggleMenu = (show) => {
    return {
        type: actionType.TOGGLE_MENU,
        payload: show
    }
}

export const toggleSuperman = (value) => {
    return {
        type: actionType.TOGGLE_SUPERMAN,
        payload: value
    }
}

export const changeNewGameParameter = (key, value) => {
    return {
        type: actionType.CHANGE_NEW_GAME_PARAMETER,
        payload: {
            key, value
        }
    }
}