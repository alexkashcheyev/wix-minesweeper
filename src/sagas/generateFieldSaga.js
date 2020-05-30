import { takeEvery, put, select } from 'redux-saga/effects';
import { actionType } from '../enums';
import * as actions from '../redux/actions'
import { selectCurrentGameInfo } from '../redux/selectors';
import { generateField } from '../shared/field';

function* workerSaga() {
    const gameInfo = yield select(selectCurrentGameInfo);

    const field = generateField(gameInfo);

    yield put(actions.updateField(field))
    
    return;
}

// watcher saga
export function* generateFieldSaga() {
    yield takeEvery(actionType.START_GAME, workerSaga)
}

export default generateFieldSaga;