import * as actions from '../constants';

const defaultState = {};

const getBalance = (state = defaultState, action) => {
  // const { payload } = action;
  // const { request } = payload;
  switch (action.type) {
    case `${actions.GET_FANTOM_BALANCE}`: {
      const accountInfo = {};
      return Object.assign({}, state, {
        ...state,
        ...accountInfo,
      });
    }
    case `${actions.GET_FANTOM_BALANCE}_SUCCESS`: {
      const { config, data } = action.payload;
      const accountInfo = {
        [config.address]: data.balance,
      };
      return Object.assign({}, state, {
        ...state,
        ...accountInfo,
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
