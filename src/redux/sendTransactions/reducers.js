import * as actions from '../constants';

const defaultState = {};

const sendTransactions = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case `${actions.SEND_RAW_TRANSACTIONS}`: {
      return Object.assign({}, state, {
        // masterKey: payload.masterKey,
        publicAddress: payload.publicAddress,
        privateKey: payload.privateKey,
      });
    }
    case `${actions.SEND_RAW_TRANSACTIONS}_SUCCESS`: {
      return Object.assign({}, state, {
        // masterKey: payload.masterKey,
        publicAddress: payload.publicAddress,
        privateKey: payload.privateKey,
      });
    }
    case `${actions.SEND_RAW_TRANSACTIONS}_FAILURE`: {
      return Object.assign({}, state, {
        // masterKey: payload.masterKey,
        publicAddress: payload.publicAddress,
        privateKey: payload.privateKey,
      });
    }
    case `${actions.GET_FANTOM_NONCE}`: {
      return Object.assign({}, state, {
        fantomNonce: '',
      });
    }
    case `${actions.GET_FANTOM_NONCE}_SUCCESS`: {
      const { data } = action.payload;
      return Object.assign({}, state, {
        fantomNonce: data.nonce,
      });
    }
    case `${actions.GET_FANTOM_NONCE}_FAILURE`: {
      return defaultState;
    }
    default:
      return state;
  }
};

export default sendTransactions;
