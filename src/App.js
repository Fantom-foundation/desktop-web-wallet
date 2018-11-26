import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

import Routes from './routes';

const { store } = configureStore();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
