import { IAccountInfoState } from './reducers';
import { ACCOUNT_INFO_ACTIONS } from './constants';

export function accountInfoCreateAccount(payload: {
  accountName: IAccountInfoState['accountName'],
  password: IAccountInfoState['password'],
  selectedIcon: IAccountInfoState['selectedIcon'],
}) {
  return {
    type: ACCOUNT_INFO_ACTIONS.CREATE_NEW_ACCOUNT,
    payload,
  };
}

export function emptyState() {
  return {
    type: ACCOUNT_INFO_ACTIONS.EMPTY_STATE,
    payload: {},
  };
}

export function createMnemonic(payload: {
  mnemonic: IAccountInfoState['mnemonic'];
}) {
  return {
    type: ACCOUNT_INFO_ACTIONS.MNEMONIC_CODE,
    payload,
  };
}

export function incrementStepNo(payload: {
  stepNo: IAccountInfoState['stepNo']
}) {
  return {
    type: ACCOUNT_INFO_ACTIONS.INCREMENT_STEP_NO,
    payload,
  };
}
