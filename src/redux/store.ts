import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import config from '~/redux/config';
import rootReducer from '~/redux/index';

/**
 * Create Axios Client to communicate
 * with Fantom API's
 */
const axiosClient = axios.create({
  baseURL: config.apiUrl,
  responseType: 'json',
});

// Store instance
// let store = null;
// let persistor = null;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['getBalance'],
};

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk, axiosMiddleware(axiosClient)))
);
const persistor = persistStore(store);

/**
 * Create the Redux store
 */
export const configureStore = () => {
  return { store, persistor };
};

/**
 * Get store
 */
export const getStore = () => store;

/**
 * Get persistor
 */
export const getPersistor = () => persistor;

/**
 * Dispatch an action
 */
// export const dispatch = (...args) => store.dispatch(...args);

export default {
  dispatch: store.dispatch,
  getStore,
  configureStore,
  persistor,
};
