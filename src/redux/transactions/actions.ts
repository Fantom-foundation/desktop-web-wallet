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

export const transactionsSetPage = (page: ITRansactionsState['page']) => ({
  type: TRANSACTIONS_ACTIONS.SET_PAGE,
  page,
});
