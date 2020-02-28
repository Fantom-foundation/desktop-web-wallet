import { TRANSACTIONS_ACTIONS } from './constants';
import { ITRansactionsState } from '.';

export const transactionsGetList = (address: string) => ({
  type: TRANSACTIONS_ACTIONS.GET_LIST,
  address,
});

export const transactionsSet = (payload: Partial<ITRansactionsState>) => ({
  type: TRANSACTIONS_ACTIONS.SET,
  payload,
});

export const setTransactionDetails = (hash, memo) => ({
  type: TRANSACTIONS_ACTIONS.SET_DETAILS,
  hash,
  memo,
});

// export const setTransactionHashDetails = transactionsDetails => ({
//   type: TRANSACTIONS_ACTIONS.SET_DETAILS,
//   transactionsDetails,
// });


export const getTransactionDetails = (payload: Partial<ITRansactionsState>) => ({
  type: TRANSACTIONS_ACTIONS.GET_DETAILS,
  payload,
});



export const transactionsSetPage = (page: ITRansactionsState['page']) => ({
  type: TRANSACTIONS_ACTIONS.SET_PAGE,
  page,
});
