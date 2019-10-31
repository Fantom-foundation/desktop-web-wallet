import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxToastr from 'react-redux-toastr';
import { configureStore } from '~/redux/store';
import { ToastContainer, ToastStore } from 'react-toasts';

import { MainRouter } from '~/view/routers/MainRouter';
import { Modal } from './view/pages/modals/Modal';

const { store, persistor } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainRouter />

      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        progressBar
        closeOnToastrClick
      />

      <Modal />

      <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />
    </PersistGate>
  </Provider>
);

export default App;
