const defaultState = {
  authenticated: false,
  user: null,
  token: null,
  auth: null,
};

const handlers = new class {
  // eslint-disable-next-line class-methods-use-this
  CREATE_ACCOUNT(state, action) {
    console.log(action, 'action CREATE_ACCOUNT');
    return state;
  }

  // eslint-disable-next-line class-methods-use-this
  UPDATE_ACCOUNT(state, action) {
    console.log(action, 'action UPDATE_ACCOUNT');
    return state;
  }
}();

function account(state = defaultState, action) {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
}

export default account;
