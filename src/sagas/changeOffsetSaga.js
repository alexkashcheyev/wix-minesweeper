import { takeEvery, put, select } from 'redux-saga/effects';
import { actionType } from '../enums';
import * as actions from '../redux/actions';
import { selectCurrentGame } from '../redux/selectors';
import { validViewportChange } from '../shared/viewport';

function* workerSaga(action) {
    // move over the field if it's bigger than the viewport

    const currentGame = yield select(selectCurrentGame);

    if (
        validViewportChange(
            currentGame.viewport, 
            currentGame.gameInfo, 
            action.payload.dx, 
            action.payload.dy
        )
    ) {
        const newX = currentGame.viewport.offset.x + action.payload.dx;
        const newY = currentGame.viewport.offset.y + action.payload.dy;

        yield put(actions.setViewportOffset({x: newX, y: newY}));
    }
}

// watcher saga
function* changeOffsetSaga() {
    yield takeEvery(actionType.MOVE_VIEWPORT, workerSaga);
}

export default changeOffsetSaga;