import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import config from '~/redux/config';
import createSagaMiddleware from 'redux-saga';
import { accountSaga } from './account/sagas';
import { createBrowserHistory } from 'history';
import { routerMiddleware, RouterState, connectRouter } from 'connected-react-router';
import { reducer as toastr } from 'react-redux-toastr';
import accounts from '~/redux/accounts/reducer';
import accountInfo from '~/redux/accountInfo/reducers';
import accountKeys from '~/redux/accountKeys/reducers';
import getBalance from '~/redux/getBalance/reducers';
import getTransactions from '~/redux/getTransactions/reducers';
import sendTransactions from '~/redux/sendTransactions/reducers';
import { account, IAccountState } from '~/redux/account';

export const history = createBrowserHistory();

export interface IState {
  account: IAccountState;
  accountInfo: any;
  accounts: any;
  accountKeys: any;
  getBalance: any;
  getTransactions: any;
  sendTransactions: any;
  toastr: any;
  router: RouterState;
}

const rootReducer = combineReducers<IState>({
  accountInfo,
  accounts,
  accountKeys,
  getBalance,
  getTransactions,
  sendTransactions,
  toastr,
  account,
  router: connectRouter(history),
});

const axiosClient = axios.create({
  baseURL: config.apiUrl,
  responseType: 'json',
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['getBalance'],
};

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      reduxThunk,
      sagaMiddleware,
      axiosMiddleware(axiosClient)
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
