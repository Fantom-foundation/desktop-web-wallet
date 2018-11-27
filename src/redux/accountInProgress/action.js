import * as types from '../constants';
import { dispatch } from '../store';

export function createAccount(data) {
  console.log(data, 'datadata');
  dispatch({
    type: types.CREATE_NEW_ACCOUNT,
    payload: data,
  });
}

export function createMnemonic(data) {
  console.log(data, 'createMnemoniccreateMnemonic');
  dispatch({
    type: types.MNEMONIC_CODE,
    payload: data,
  });
}
