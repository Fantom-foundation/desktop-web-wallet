import * as types from '../constants';
// import storage from '../store';

const defaultState = {};

const accountInfo = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.CREATE_NEW_ACCOUNT: {
      return Object.assign({}, state, {
        accountName: payload.accountName,
        password: payload.password,
        passwordHint: payload.passwordHint,
        selectedIcon: payload.selectedIcon,
        stepNo: payload.stepNo,
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

export default accountInfo;
