import * as types from '~/redux/constants';

export default function createWallet(data) {
  return {
    type: types.CREATE_WALLET,
    payload: data,
  };
}
