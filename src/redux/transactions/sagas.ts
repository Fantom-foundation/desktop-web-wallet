import { takeLatest, call } from 'redux-saga/effects';
import { transactionsGetList } from './actions';
import { TRANSACTIONS_ACTIONS } from './constants';
import { mockGetTransactions } from '~/utility/mocks/tranactions';

function* getList({ address }: ReturnType<typeof transactionsGetList>) {
  const list = yield call(mockGetTransactions, address);
  console.log({ list });
}

export function* transactionsSaga() {
  yield takeLatest(TRANSACTIONS_ACTIONS.GET_LIST, getList); 
}