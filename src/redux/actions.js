export const actionType = {
    TOGGLE_MENU : 'TOGGLE_MENU',
    TOGGLE_SUPERMAN: 'TOGGLE_SUPERMAN'
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