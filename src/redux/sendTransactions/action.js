import action from '../action';
import * as actions from '../constants';

// Action to call to a backend nearByUsers API
export const sendRawTransaction = data =>
  action({
    type: actions.TRANSFER_MONEY,
    payload: {
      request: {
        url: '/sendRawTransaction',
        method: 'POST',
        data: data.hexTx,
        transferData: data,
      },
    },
  });

export const getFantomNonce = address =>
  action({
    type: actions.GET_FANTOM_NONCE,
    payload: {
      request: {
        url: `/account/${address}`,
        method: 'GET',
        data: {},
      },
    },
  });
