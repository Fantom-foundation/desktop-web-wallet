import { takeLatest, call, put, select } from 'redux-saga/effects';
import { transactionsGetList, transactionsSet } from './actions';
import { TRANSACTIONS_ACTIONS } from './constants';
import { mockGetTransactions } from '~/utility/mocks/tranactions';
import { selectTransactions } from './selectors';
import { getTransactions } from './api';

function* getList({ address }: ReturnType<typeof transactionsGetList>) {
  yield put(transactionsSet({ error: null, is_loading: true }));

  const { page } = yield select(selectTransactions);
  const offset = page * 10;

  // const { error, data } = yield call(mockGetTransactions, address, offset, 10);
  const { error, data } = yield call(getTransactions, address, offset, 10);

  if (!!error || !data.data || !data.data.transactions) {
    return yield put(
      transactionsSet({
        error: `Can't get transactions list`,
        is_loading: false,
      })
    );
  }

  return yield put(
    transactionsSet({
      error: null,
      is_loading: false,
      list: data.data.transactions,
    })
  );
}

export function* transactionsSaga() {
  yield takeLatest(TRANSACTIONS_ACTIONS.GET_LIST, getList);
}
