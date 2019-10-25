import * as actions from '~/redux/constants';

const defaultState = {};

const getTransactions = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case `${actions.GET_FANTOM_TRANSACTIONS}`: {
      return { ...state, // masterKey: payload.masterKey,
        publicAddress: payload.publicAddress,
        privateKey: payload.privateKey};
    }
    case `${actions.GET_FANTOM_TRANSACTIONS}_SUCCESS`: {
      return { ...state, // masterKey: payload.masterKey,
        publicAddress: payload.publicAddress,
        privateKey: payload.privateKey};
    }
    case `${actions.GET_FANTOM_TRANSACTIONS}_FAILURE`: {
      return defaultState;
    }
    default:
      return state;
  }
};

export default getTransactions;
