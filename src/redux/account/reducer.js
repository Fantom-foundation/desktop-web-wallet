import * as types from '../constants';
// import storage from '../store';

const defaultState = {
  accountName: '',
  password: '',
  passwordHint: '',
  reEnteredPassword: '',
};

const accountInfo = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.CREATE_NEW_ACCOUNT: {
      return Object.assign({}, state, {
        accountName: payload.accountName,
        password: payload.password,
        passwordHint: payload.passwordHint,
        reEnteredPassword: payload.reEnteredPassword,
        selectedIcon: payload.selectedIcon,
      });
    }
    default:
      return state;
  }
};

export default accountInfo;
