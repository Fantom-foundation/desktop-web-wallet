import { combineReducers } from 'redux';
import accounts from './account/reducer';
import accountInfo from './accountInProgress/reducers';
import accountKeys from './keys/reducers';
import getBalance from './getBalance/reducers';
import getTransactions from './getTransactions/reducers';
import sendTransactions from './sendTransactions/reducers';

const rootReducer = combineReducers({
  accountInfo,
  accounts,
  accountKeys,
  getBalance,
  getTransactions,
  sendTransactions,
});

export default rootReducer;
