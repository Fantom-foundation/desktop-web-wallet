import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import createSagaMiddleware from "redux-saga";
import { accountSaga } from "./account/sagas";
import { createBrowserHistory } from "history";
import {
  routerMiddleware,
  RouterState,
  connectRouter,
} from "connected-react-router";
import { reducer as toastr } from "react-redux-toastr";

import { account, IAccountState } from "~/redux/account";
import { modal, IModalState } from "~/redux/modal";

export const history = createBrowserHistory();

const accountPersistConfig = {
  key: "account",
  storage,
};

export interface IState {
  account: IAccountState;
  router: RouterState;
  modal: IModalState;
  toastr: any;
}

export const rootReducer = combineReducers<IState>({
  toastr,
  account: persistReducer(accountPersistConfig, account),
  router: connectRouter(history),
  modal,
});

export const rootTestReducer = combineReducers<IState>({
  toastr,
  account,
  router: connectRouter(history),
  modal,
});

const composeEnhancers =
  typeof window === "object" &&
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
