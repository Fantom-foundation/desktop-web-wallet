import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { account, IAccountState } from '~/redux/account';
import { modal, IModalState } from '~/redux/modal';
import { stakes, InitialStateType } from '~/redux/stake';

export interface IState {
  account: IAccountState;
  modal: IModalState;
  stakes: InitialStateType;
  // accountInfo: any,
  // accounts: any,
  // accountKeys: any,
  // getBalance: any,
  // getTransactions: any,
  // sendTransactions: any,
  toastr: any;
}

const rootReducer = combineReducers<IState>({
  // accountInfo,
  // accounts,
  // accountKeys,
  // getBalance,
  // getTransactions,
  // sendTransactions,
  stakes,
  toastr,
  account,
  modal,
});

export default rootReducer;
