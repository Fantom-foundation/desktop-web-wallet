import * as types from '~/redux/constants';

const defaultState = {};

const accountKeys = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.MASTER_PUBLIC_PRIVATE_KEY: {
      return { ...state, publicAddress: payload.publicAddress};
    }
    case types.EMPTY_KEYS_STATE: {
      return defaultState;
    }
    default:
      return state;
  }
};

export default accountKeys;
