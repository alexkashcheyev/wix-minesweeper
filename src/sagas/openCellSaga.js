import { takeEvery, put, select } from 'redux-saga/effects';

import { actionType, gameStage } from '../enums';
import * as actions from '../redux/actions'
import { openCellsFrom, countClosedCells } from '../shared/field';
import { selectCurrentGame } from '../redux/selectors';

function* workerSaga(action) {
    const { x, y } = action.payload;

    const currentGame = yield select(selectCurrentGame);

    // if the cell being opened has mine,
    // the game is over
    if (currentGame.field[x][y].hasMine) {
        yield put(actions.setGameStage(gameStage.LOST));
        yield put(actions.setMessage(true, 'warning', 'You lost!', 'Maybe you will be luckier next time.'));

        return
    }
 
    // recursively open the cells starting from the given one
    const newField = openCellsFrom(x, y, currentGame.field);
    
    // if all closed (flagged or not) cells have mines
    // autoflag them and count as win
    // Or, if amount of closed cells equals number of planted mines
    const closedRemaining = countClosedCells(newField);

    if (
        closedRemaining === currentGame.gameInfo.mines
    ) {
        yield put(actions.setMessage(true, 'success', 'You won!', 'You opened all the safe cells, that counts as win!'))
        yield put(actions.setGameStage(gameStage.WON));
    }

    yield put(actions.setField(newField));
}


// watcher saga
function* openCellSaga() {
    yield takeEvery(actionType.OPEN_CELL, workerSaga)
}

export default openCellSaga;