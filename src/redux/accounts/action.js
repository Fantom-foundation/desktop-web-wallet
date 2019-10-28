import * as types from '~/redux/constants';

export const createWallet = data => {
  return {
    type: types.CREATE_WALLET,
    payload: data,
  };
};
