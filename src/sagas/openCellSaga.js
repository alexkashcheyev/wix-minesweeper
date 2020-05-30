import { takeEvery, put, select } from 'redux-saga/effects';
import { actionType, gameStage } from '../enums';
import * as actions from '../redux/actions'
import { openCellsFrom } from '../shared/field';
import { selectField, selectCurrentGame } from '../redux/selectors';

function* workerSaga(action) {
    const { x, y } = action.payload;

    const currentGame = yield select(selectCurrentGame);

    if (currentGame.field[x][y].hasMine) {
        yield put(actions.changeGameStage(gameStage.LOST));
        yield put(actions.toggleMessage(true, 'warning', 'You lost!', 'Maybe you will be luckier next time.'))
    }
 
    const newField = openCellsFrom(x, y, currentGame.field);
    
    
    // if all closed (flagged or not) cells have mines
    // autoflag them and count as win
    // Or, if amount of closed cells equals number of planted mines
    
    const closedRemaining = newField.reduce(
        (fieldSum, column) => {
            const fieldSumAddition = column.reduce(
                (colSum, cell) => {
                    const addition = (cell.isOpened ? 0 : 1);
                    return colSum + addition;
                },
                0
            )
            return fieldSum + fieldSumAddition;
        },
        0
    )

    if (
        closedRemaining === currentGame.gameInfo.mines
    ) {
        yield put(actions.toggleMessage(true, 'success', 'You won!', 'You opened all the safe cells, that counts as win!'))
        yield put(actions.changeGameStage(gameStage.WON));
    }

    yield put(actions.updateField(newField));
}

// watcher saga
function* openCellSaga() {
    yield takeEvery(actionType.OPEN_CELLS, workerSaga)
}

export default openCellSaga;