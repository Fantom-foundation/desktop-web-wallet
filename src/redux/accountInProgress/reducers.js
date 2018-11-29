import * as types from '../constants';
// import storage from '../store';

const defaultState = { stepNo: 1 };

const accountInfo = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.CREATE_NEW_ACCOUNT: {
      return Object.assign({}, state, {
        accountName: payload.accountName,
        password: payload.password,
        passwordHint: payload.passwordHint,
        selectedIcon: payload.selectedIcon,
      });
    }
    case types.MNEMONIC_CODE: {
      return Object.assign({}, state, {
        mnemonic: payload.mnemonic,
      });
    }
    case types.INCREMENT_STEP_NO: {
      return Object.assign({}, state, {
        stepNo: payload.stepNo,
      });
    }
    case types.EMPTY_STATE: {
      return defaultState;
    }
    default:
      return state;
  }
};

export default accountInfo;
