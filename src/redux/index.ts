import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import accounts from '~/redux/accounts/reducer';
import accountInfo from '~/redux/accountInfo/reducers';
import accountKeys from '~/redux/accountKeys/reducers';
import getBalance from '~/redux/getBalance/reducers';
import getTransactions from '~/redux/getTransactions/reducers';
import sendTransactions from '~/redux/sendTransactions/reducers';
import { account, IAccountState } from '~/redux/account';

export interface IState {
  account: IAccountState,
  accountInfo: any,
  accounts: any,
  accountKeys: any,
  getBalance: any,
  getTransactions: any,
  sendTransactions: any,
  toastr: any,
}

const rootReducer = combineReducers<IState>({
  accountInfo,
  accounts,
  accountKeys,
  getBalance,
  getTransactions,
  sendTransactions,
  toastr,
  account,
});

export default rootReducer;
