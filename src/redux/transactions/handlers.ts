import { TRANSACTIONS_ACTIONS } from './constants';
import { ITRansactionsState } from '.';
import { transactionsSet, transactionsSetPage } from './actions';

const setState = (
  state: ITRansactionsState,
  { payload }: ReturnType<typeof transactionsSet>
): ITRansactionsState => ({
  ...state,
  ...payload,
});

const setPage = (
  state: ITRansactionsState,
  { page }: ReturnType<typeof transactionsSetPage>
): ITRansactionsState => ({
  ...state,
  page,
});

export const TRANSACTIONS_HANDLERS = {
  [TRANSACTIONS_ACTIONS.SET]: setState,
  [TRANSACTIONS_ACTIONS.SET_PAGE]: setPage,
};
