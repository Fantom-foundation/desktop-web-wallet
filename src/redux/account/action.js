import * as types from '../constants';

export function createAccount(data) {
  return {
    type: types.CREATE_ACCOUNT,
    payload: data,
  };
}

export function updateAccount(data) {
  return {
    type: types.UPDATE_ACCOUNT,
    payload: data,
  };
}
