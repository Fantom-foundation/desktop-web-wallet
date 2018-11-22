import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import './styles/app/app.scss';
import { configureStore } from './redux/store';

const { store } = configureStore();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <p>Hello</p>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;
