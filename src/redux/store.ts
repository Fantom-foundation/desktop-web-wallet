import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import config from '~/redux/config';
import rootReducer from '~/redux/index';
import createSagaMiddleware from 'redux-saga';
import { accountSaga } from './account/sagas';

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
  composeEnhancers(applyMiddleware(reduxThunk, sagaMiddleware, axiosMiddleware(axiosClient)))
);
const persistor = persistStore(store);

export const configureStore = () => {
  sagaMiddleware.run(accountSaga);
  return { store, persistor };
};

export const getStore = () => store;
export const getPersistor = () => persistor;

export default {
  dispatch: store.dispatch,
  getStore,
  configureStore,
  persistor,
};
