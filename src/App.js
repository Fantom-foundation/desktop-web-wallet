import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxToastr from 'react-redux-toastr';
import { configureStore } from './redux/store';

import Routes from './routes';

const { store, persistor } = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
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
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
