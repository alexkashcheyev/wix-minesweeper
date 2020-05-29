import { takeEvery, put } from 'redux-saga/effects';
import { actionType } from '../enums';
import * as actions from '../redux/actions'

function* workerSaga() {
    yield put(actions.toggleMessage(true, 'info', 'thanks!', 'I appreciat that'))
}

// watcher saga
function* testSaga() {
    yield takeEvery(actionType.START_GAME, workerSaga)
}

export default testSaga;