import * as types from '../constants';
// import storage from '../store';

const defaultState = {};

const handlers = new class {
  // eslint-disable-next-line class-methods-use-this
  CREATE_NEW_ACCOUNT(state, action) {
    console.log(state, 'state');
    console.log(action, 'action');
    const { payload } = action;
    switch (action.type) {
      case types.CREATE_NEW_ACCOUNT:
        return Object.assign({}, state, {
          accountName: payload.accountName,
          password: payload.password,
          passwordHint: payload.passwordHint,
          accountIcon: payload.accountIcon,
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
