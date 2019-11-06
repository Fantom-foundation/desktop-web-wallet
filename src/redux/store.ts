import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import createSagaMiddleware from 'redux-saga';
import { accountSaga } from './account/sagas';
import { createBrowserHistory } from 'history';
import { routerMiddleware, RouterState, connectRouter } from 'connected-react-router';
import { reducer as toastr } from 'react-redux-toastr';

// import accountInfo from '~/redux/__accountInfo/reducers';
// import accountKeys from '~/redux/__accountKeys/reducers';
// import getBalance from '~/redux/getBalance/reducers';
// import getTransactions from '~/redux/getTransactions/reducers';
// import sendTransactions from '~/redux/sendTransactions/reducers';

import { account, IAccountState } from '~/redux/account';
import { modal, IModalState } from '~/redux/modal';

export const history = createBrowserHistory();

const accountPersistConfig = {
  key: 'account',
  storage,
};

export interface IState {
  account: IAccountState;
  router: RouterState;
  modal: IModalState;  
  toastr: any;

  // accounts: any;
  // getBalance: any;
  // accountInfo: any;
  // accountKeys: any;
  // getTransactions: any;
  // sendTransactions: any;
}

const rootReducer = combineReducers<IState>({
  toastr,
  account: persistReducer(accountPersistConfig, account),
  router: connectRouter(history),
  modal, 
});

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);
const persistor = persistStore(store);

export const configureStore = () => {
  sagaMiddleware.run(accountSaga);
  return { store, persistor, history };
};

export const getStore = () => store;
export const getPersistor = () => persistor;

export default {
  dispatch: store.dispatch,
  getStore,
  configureStore,
  persistor,
};
