import { combineReducers } from 'redux';
// import accountInfo from './account/reducer';
import accountInfo from './accountInProgress/reducers';
// import accountKeys from './keys/reducers';

const rootReducer = combineReducers({
  accountInfo,
});

export default rootReducer;
