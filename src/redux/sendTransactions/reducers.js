import * as actions from '../constants';

const defaultState = {};

const sendTransactions = (state = defaultState, action) => {
  switch (action.type) {
    case `${actions.TRANSFER_MONEY}`: {
      return Object.assign({}, state, {
        transactionHash: '',
      });
    }
    case `${actions.TRANSFER_MONEY}_SUCCESS`: {
      const { data } = action.payload;
      return Object.assign({}, state, {
        transactionHash: data.txHash,
      });
    }
    case `${actions.TRANSFER_MONEY}_FAILURE`: {
      return defaultState;
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
