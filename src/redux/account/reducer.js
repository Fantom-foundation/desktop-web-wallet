import * as types from '../constants';
// import storage from '../store';

const defaultState = {
  accountName: '',
  password: '',
  passwordHint: '',
  reEnteredPassword: '',
};

const handlers = new class {
  // eslint-disable-next-line class-methods-use-this
  CREATE_NEW_ACCOUNT(state, action) {
    console.log(action, 'action');
    const { payload } = action;
    switch (action.type) {
      case types.CREATE_NEW_ACCOUNT:
        return Object.assign({}, state, {
          accountName: payload.accountName,
          password: payload.password,
          passwordHint: payload.passwordHint,
          reEnteredPassword: payload.reEnteredPassword,
          selectedIcon: payload.selectedIcon,
        });
      default:
        return state;
    }
  }
}();

function accountInfo(state = defaultState, action) {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
}

export default accountInfo;
