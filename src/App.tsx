import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxToastr from 'react-redux-toastr';
import { configureStore } from '~/redux/store';

import Routes from '~/routes';

const { store, persistor } = configureStore();

const App = () => (
  <Provider store={store}>
    <>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        progressBar
        closeOnToastrClick
      />
    </>
  </Provider>
);

export default App;
