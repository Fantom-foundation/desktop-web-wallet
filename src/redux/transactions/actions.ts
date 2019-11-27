import { TRANSACTIONS_ACTIONS } from './constants';

export const transactionsGetList = (address: string) => ({
  type: TRANSACTIONS_ACTIONS.GET_LIST,
  address,
});
