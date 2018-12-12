import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
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
  toastr: toastrReducer,
});

export default rootReducer;
