import action from '../action';
import * as actions from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const getFantomBalance = address =>
  action({
    type: actions.GET_FANTOM_BALANCE,
    payload: {
      request: {
        url: `/account/${address}`,
        method: 'GET',
        data: {},
        address,
      },
    },
  });
