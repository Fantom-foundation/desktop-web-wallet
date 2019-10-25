import * as types from '~/redux/constants';

const defaultState = { accountsList: [] };

// return the list of registered accounts
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

// reducer to set the accounts state variable
const accounts = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.CREATE_WALLET: {
      const accountsList = addAccount(payload, state);
      return { ...state, ...accountsList};
    }
    default:
      return state;
  }
};

export default accounts;
