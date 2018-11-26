import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/app/app.scss';
import { configureStore } from './redux/store';
import Homepage from './components/app/homepage';

const { store, persistor } = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Homepage />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
