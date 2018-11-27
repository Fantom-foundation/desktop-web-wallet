import { combineReducers } from 'redux';
import accountInfo from './account/reducer';
import accountKeys from './keys/reducers';

const rootReducer = combineReducers({
  accountInfo,
  accountKeys,
});

export default rootReducer;
