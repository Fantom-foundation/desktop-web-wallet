import { takeLatest, call, put, select } from 'redux-saga/effects';
import { transactionsGetList, transactionsSet, setTransactionDetails, getTransactionDetails  } from './actions';
import { TRANSACTIONS_ACTIONS } from './constants';
import { mockGetTransactions } from '~/utility/mocks/tranactions';
import { selectTransactions } from './selectors';
import { getTransactions, getFTMPrice } from './api';

function* getList({ address }: ReturnType<typeof transactionsGetList>) {
  
  const res = localStorage.getItem("isModalOpen")
  if(res === 'true'){
    return;
  }
  const { page, list, address:prevAddress } = yield select(selectTransactions);
  const updatedList = (prevAddress !== address ? [] : list)
  yield put(transactionsSet({ error: null, is_loading: true, list: updatedList, address }));

  const offset = page * 10;

  const { error, data } = yield call(getTransactions, address, offset, 10);
  // yield call(getBalance, accountGetBalance(from));


  if (!!error || !data.data.account) {
    return yield put(
      transactionsSet({
        error: `Can't get transactions list`,
        is_loading: false,
        list:[],
        address,
      })
    );
  }

  return yield put(
    transactionsSet({
      error: null,
      is_loading: false,
      list: data.data.account.transactions,
      address,
    })
  );
}

// function* setTransactionDetail({ hash, memo }: ReturnType<typeof setTransactionDetails>) {
//   yield put(transactionsSet({ error: null, is_loading: true }));

//   const { page } = yield select(selectTransactions);
//   const offset = page * 10;
//   console.log(address, offset, '*****address')

//   const { error, data } = yield call(getTransactions, address, offset, 10);
//   console.log(error, data, '*****data')
//   // yield call(getBalance, accountGetBalance(from));


//   if (hash) {
//     return yield put(
//       transactionsSet({
//         error: `Can't get transactions list`,
//         is_loading: false,
//         list:[],
//       })
//     );
//   }

//   return yield put(
//     transactionsSet({
//       error: null,
//       is_loading: false,
//       list: data.data.account.transactions,
//     })
//   );
// }


export function* transactionsSaga() {
  yield takeLatest(TRANSACTIONS_ACTIONS.GET_LIST, getList);
  // yield takeLatest(TRANSACTIONS_ACTIONS.SET_DETAILS, setTransactionDetail);
}
