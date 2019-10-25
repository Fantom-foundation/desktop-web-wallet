import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import accounts from '~/redux/account/reducer';
import accountInfo from '~/redux/accountInProgress/reducers';
import accountKeys from '~/redux/keys/reducers';
import getBalance from '~/redux/getBalance/reducers';
import getTransactions from '~/redux/getTransactions/reducers';
import sendTransactions from '~/redux/sendTransactions/reducers';

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
