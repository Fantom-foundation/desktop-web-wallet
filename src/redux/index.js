import { combineReducers } from 'redux';
import accountInfo from './account/reducer';

const rootReducer = combineReducers({
  accountInfo,
});

export default rootReducer;
