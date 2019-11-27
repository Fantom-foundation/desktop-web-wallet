import { createReducer } from '~/utility/createReducer';
import { TRANSACTIONS_HANDLERS } from './handlers';
import { IAccountTransaction } from './types';

export interface ITRansactionsState {
  list: IAccountTransaction[];
}

export const TRANSACTIONS_INITIAL_STATE: ITRansactionsState = {
  list: [],
};

export const transactions = createReducer(
  TRANSACTIONS_INITIAL_STATE,
  TRANSACTIONS_HANDLERS
);
