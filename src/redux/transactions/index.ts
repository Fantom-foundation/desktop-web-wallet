import { createReducer } from '~/utility/createReducer';
import { TRANSACTIONS_HANDLERS } from './handlers';
import { IAccountTransaction } from './types';

export interface ITRansactionsState {
  list: IAccountTransaction[];
  is_loading: boolean;
  error: string | null;
  page: number;
}

export const TRANSACTIONS_INITIAL_STATE: ITRansactionsState = {
  list: [],
  is_loading: false,
  error: null,
  page: 0,
};

export const transactions = createReducer(
  TRANSACTIONS_INITIAL_STATE,
  TRANSACTIONS_HANDLERS
);
