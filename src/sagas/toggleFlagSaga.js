import { takeEvery, take, put, select } from 'redux-saga/effects';
import { actionType } from '../enums';
import * as actions from '../redux/actions';
import { selectCurrentGame } from '../redux/selectors';
import { clone } from 'lodash';

function* workerSaga(action) {
    const { x, y } = action.payload;
    const { field, flagsSet, gameInfo } = yield select(selectCurrentGame)

    console.log('toggling flag at',x,y);

    // Can't flag an opened cell
    if (field[x][y].isOpened) return;

    // Taking the flag off
    if (field[x][y].isFlagged) {

        const newField = clone(field);
        newField[x][y].isFlagged = false;

        yield put(actions.updateField(newField));
        yield put(actions.updateSetFlags(-1));

        return;        
    }

    // Show message if no flags left
    if (flagsSet === gameInfo.mines) {
        yield put(actions.toggleMessage(
            true, 
            'warning',
            'No flags left',
            'You had just enough flags to flag all the mines.'
        ))

        return;
    }

    // At this point we filtered out the cases where we wouldn't 
    // actualy put a flag

    const newField = clone(field);
    newField[x][y].isFlagged = true;
    
    yield put(actions.updateField(newField));

    // and don't forget to increase set flags amount

    yield put(actions.updateSetFlags(1));

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
        yield put(actions.toggleMessage(
            true,
            'success',
            'You win!',
            'Congratulations!'
        ));
    }
}

// watcher saga
export function* toggleFlagSaga() {
    yield takeEvery(actionType.TOGGLE_FLAG, workerSaga)
}

export default toggleFlagSaga;