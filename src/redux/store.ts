import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { accountSaga } from './account/sagas';
import { transactionsSaga } from './transactions/sagas';
import { createBrowserHistory } from 'history';
import {
  routerMiddleware,
  RouterState,
  connectRouter,
} from 'connected-react-router';
import { reducer as toastr } from 'react-redux-toastr';

import { account, IAccountState } from '~/redux/account';
import { modal, IModalState } from '~/redux/modal';
import { transactions, ITRansactionsState } from '~/redux/transactions';

export const history = createBrowserHistory();

const accountPersistConfig = {
  key: 'account',
  whitelist: ['list', 'connection'],
  storage,
};

export interface IState {
  account: IAccountState;
  router: RouterState;
  modal: IModalState;
  transactions: ITRansactionsState;
  toastr: any;
}

export const rootReducer = combineReducers<IState>({
  toastr,
  account: persistReducer(accountPersistConfig, account),
  router: connectRouter(history),
  transactions,
  modal,
});

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

const persistor = persistStore(store);

export const configureStore = () => {
  sagaMiddleware.run(accountSaga);
  sagaMiddleware.run(transactionsSaga);
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
