import { combineReducers } from 'redux';
import account from './account/reducer';

const rootReducer = combineReducers({
  account,
});

export default rootReducer;
