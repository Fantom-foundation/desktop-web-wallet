import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { account, IAccountState } from '~/redux/account';

export interface IState {
  account: IAccountState,
  // accountInfo: any,
  // accounts: any,
  // accountKeys: any,
  // getBalance: any,
  // getTransactions: any,
  // sendTransactions: any,
  toastr: any,
}

const rootReducer = combineReducers<IState>({
  // accountInfo,
  // accounts,
  // accountKeys,
  // getBalance,
  // getTransactions,
  // sendTransactions,
  toastr,
  account,
});

export default rootReducer;
