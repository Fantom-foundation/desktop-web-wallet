import * as types from '~/redux/constants';

const defaultState = { stepNo: 1 };

const accountInfo = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.CREATE_NEW_ACCOUNT: {
      return { ...state, accountName: payload.accountName,
        password: payload.password,
        selectedIcon: payload.selectedIcon};
    }
    case types.MNEMONIC_CODE: {
      return { ...state, mnemonic: payload.mnemonic};
    }
    case types.INCREMENT_STEP_NO: {
      return { ...state, stepNo: payload.stepNo};
    }
    case types.EMPTY_STATE: {
      return defaultState;
    }
    default:
      return state;
  }
};

export default accountInfo;
