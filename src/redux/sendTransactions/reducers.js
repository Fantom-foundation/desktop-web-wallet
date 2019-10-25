import * as actions from '~/redux/constants';

const defaultState = { transactions: [] };

// return the list of registered accounts
const addTransaction = (payload, state) => {
  if (payload) {
    const { transactions } = state;
    if (payload) {
      const Updatedtransactions = {
        transactions: transactions.concat(payload),
      };
      return Updatedtransactions;
    }
  }
  return {};
};

const sendTransactions = (state = defaultState, action) => {
  switch (action.type) {
    case `${actions.TRANSFER_MONEY}_SUCCESS`: {
      const { payload } = action;
      const transactions = addTransaction(payload.config.transferData, state);
      return { ...state, ...transactions};
    }
    case `${actions.TRANSFER_MONEY}_FAILURE`: {
      return defaultState;
    }
    case `${actions.GET_FANTOM_NONCE}`: {
      return { ...state, fantomNonce: ''};
    }
    case `${actions.GET_FANTOM_NONCE}_SUCCESS`: {
      const { data } = action.payload;
      return { ...state, fantomNonce: data.nonce};
    }
    case `${actions.GET_FANTOM_NONCE}_FAILURE`: {
      return defaultState;
    }
    default:
      return state;
  }
};

export default sendTransactions;
