// import * as Actions from './action';

const defaultState = { accountsList: [] };

// Result of nearByUser api
const addAccount = (action, state) => {
  if (action && action.payload) {
    const data = action.payload;
    const { accountsList } = state;
    if (data) {
      const accounts = {
        accountsList: accountsList.concat(data),
      };
      return accounts;
    }
  }
  return {};
};

// Reducer for handling near by users
const accounts = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_WALLET': {
      const accountsList = addAccount(action, state);
      return Object.assign({}, state, {
        ...accountsList,
      });
    }
    default:
      return state;
  }
};

export default accounts;
