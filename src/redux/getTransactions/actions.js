import action from '~/redux/action';
import * as actions from '~/redux/constants';

// eslint-disable-next-line import/prefer-default-export
export const getTransactionsHistory = address =>
  action({
    type: actions.GET_FANTOM_BALANCE,
    payload: {
      request: {
        url: `/transactions/${address}`,
        method: 'GET',
        data: {},
      },
    },
  });
