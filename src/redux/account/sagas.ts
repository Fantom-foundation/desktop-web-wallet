import { takeLatest, put } from 'redux-saga/effects';
import { ACCOUNT_ACTIONS } from './constants';
import { accountCreateSetCredentials, accountSetCreate } from './actions';
import { ACCOUNT_CREATION_STAGES } from '.';

function* createSetCredentials({ create }: ReturnType<typeof accountCreateSetCredentials>) {
  yield put(accountSetCreate({ ...create, stage: ACCOUNT_CREATION_STAGES.INFO }));
}

export function* accountSaga() {
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_CREDENTIALS, createSetCredentials);
}
