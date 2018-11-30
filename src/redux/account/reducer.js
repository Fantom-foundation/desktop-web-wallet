import * as types from '../constants';

const defaultState = { accountsList: [] };

// Result of nearByUser api
const addAccount = (payload, state) => {
  if (payload) {
    const { accountsList } = state;
    if (payload) {
      const accounts = {
        accountsList: accountsList.concat(payload),
      };
      return accounts;
    }
  }
  return {};
};

// Reducer for handling near by users
const accounts = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.CREATE_WALLET: {
      const accountsList = addAccount(payload, state);
      return Object.assign({}, state, {
        ...accountsList,
      });
    }
    default:
      return state;
  }
};

export default accounts;
