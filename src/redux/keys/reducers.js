import * as types from '../constants';
// import storage from '../store';

const defaultState = {};

const accountKeys = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.MASTER_PUBLIC_PRIVATE_KEY: {
      return Object.assign({}, state, {
        // masterKey: payload.masterKey,
        publicAddress: payload.publicAddress,
        // privateKey: payload.privateKey,
      });
    }
    case types.MNEMONIC_CODE: {
      return Object.assign({}, state, {
        mnemonic: payload.mnemonic,
      });
    }
    default:
      return state;
  }
};

export default accountKeys;
