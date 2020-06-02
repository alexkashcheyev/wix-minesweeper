import { takeEvery, put, select } from 'redux-saga/effects';
import { actionType } from '../enums';
import * as actions from '../redux/actions';
import { selectCurrentGame, selectViewport } from '../redux/selectors';
import { validViewportChange } from '../shared/viewport.helpers';

function* workerSaga(action) {
    // move over the field if it's bigger than the viewport

    const currentGame = yield select(selectCurrentGame);
    const viewport = yield select(selectViewport);

    if (
        validViewportChange(
            viewport, 
            currentGame.gameInfo, 
            action.payload.dx, 
            action.payload.dy
        )
    ) {
        const newX = viewport.offset.x + action.payload.dx;
        const newY = viewport.offset.y + action.payload.dy;

        yield put(actions.setViewportOffset({x: newX, y: newY}));
    }
}

// watcher saga
function* changeOffsetSaga() {
    yield takeEvery(actionType.MOVE_VIEWPORT, workerSaga);
}

export default changeOffsetSaga;