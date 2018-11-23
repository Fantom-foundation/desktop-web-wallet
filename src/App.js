import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import Home from './view/pages/home';

const { store } = configureStore();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;
