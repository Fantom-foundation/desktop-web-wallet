import * as actions from '../constants';

const defaultState = {};

const getBalance = (state = defaultState, action) => {
  switch (action.type) {
    case `${actions.GET_FANTOM_BALANCE}`: {
      return Object.assign({}, state, {
        fantomBalance: 0,
      });
    }
    case `${actions.GET_FANTOM_BALANCE}_SUCCESS`: {
      const { data } = action.payload;
      return Object.assign({}, state, {
        fantomBalance: data.balance,
      });
    }
    case `${actions.GET_FANTOM_BALANCE}_FAILURE`: {
      return defaultState;
    }
    default:
      return state;
  }
};

export default getBalance;
