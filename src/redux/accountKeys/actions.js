import * as types from '~/redux/constants';

export function createPublicPrivateKeys(data) {
  return {
    type: types.MASTER_PUBLIC_PRIVATE_KEY,
    payload: data,
  };
}

export function emptyKeysState() {
  return {
    type: types.MASTER_PUBLIC_PRIVATE_KEY,
    payload: {},
  };
}
