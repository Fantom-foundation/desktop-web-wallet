import * as actions from '../constants';

const defaultState = {};

const getTransactions = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case `${actions.GET_FANTOM_TRANSACTIONS}`: {
      return Object.assign({}, state, {
        // masterKey: payload.masterKey,
        publicAddress: payload.publicAddress,
        privateKey: payload.privateKey,
      });
    }
    case `${actions.GET_FANTOM_TRANSACTIONS}_SUCCESS`: {
      return Object.assign({}, state, {
        // masterKey: payload.masterKey,
        publicAddress: payload.publicAddress,
        privateKey: payload.privateKey,
      });
    }
    case `${actions.GET_FANTOM_TRANSACTIONS}_FAILURE`: {
      return Object.assign({}, state, {
        // masterKey: payload.masterKey,
        publicAddress: payload.publicAddress,
        privateKey: payload.privateKey,
      });
    }
    default:
      return state;
  }
};

export default getTransactions;
