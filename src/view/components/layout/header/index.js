import React from 'react';
import Nav from './nav';

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header id="header">
        <Nav />
      </header>
    );
  }
}
