import * as types from '../constants';

export function createAccount(data) {
  return {
    type: types.CREATE_NEW_ACCOUNT,
    payload: data,
  };
}

export function emptyState() {
  return {
    type: types.EMPTY_STATE,
    payload: {},
  };
}

export function createMnemonic(data) {
  return {
    type: types.MNEMONIC_CODE,
    payload: data,
  };
}

export function incrementStepNo(data) {
  return {
    type: types.INCREMENT_STEP_NO,
    payload: data,
  };
}
