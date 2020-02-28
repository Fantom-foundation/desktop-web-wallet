import { TRANSACTIONS_ACTIONS } from './constants';
import { ITRansactionsState } from '.';
import { transactionsSet, transactionsSetPage, setTransactionDetails } from './actions';
import { assocPath } from 'ramda';

const setState = (
  state: ITRansactionsState,
  { payload }: ReturnType<typeof transactionsSet>
): ITRansactionsState => {
  
  return ({
  ...state,
  ...payload,
})};

const setPage = (
  state: ITRansactionsState,
  { page }: ReturnType<typeof transactionsSetPage>
): ITRansactionsState => ({
  ...state,
  page,
});

const setTransactionHash = (
  state: ITRansactionsState,
  { hash, memo }: ReturnType<typeof setTransactionDetails>
): ITRansactionsState => {
  const prevDetails = state.transactionsDetails;
  prevDetails[hash] = memo

  return assocPath(['transactionsDetails'], {
    ...prevDetails,
  }, state);
//   return ({
//   ...state,
//   transactionsDetails: prevDetails,
// })
};

export const TRANSACTIONS_HANDLERS = {
  [TRANSACTIONS_ACTIONS.SET]: setState,
  [TRANSACTIONS_ACTIONS.SET_PAGE]: setPage,
  [TRANSACTIONS_ACTIONS.SET_DETAILS]: setTransactionHash,

};
