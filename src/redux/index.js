import { combineReducers } from 'redux';
import accounts from './account/reducer';
import accountInfo from './accountInProgress/reducers';
import accountKeys from './keys/reducers';

const rootReducer = combineReducers({
  accountInfo,
  accounts,
  accountKeys,
});

export default rootReducer;
