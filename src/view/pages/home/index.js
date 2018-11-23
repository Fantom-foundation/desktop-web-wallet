import React from 'react';
import Layout from '../../components/layout';

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="home" className="home landing-page">
        <Layout>Operachain Powered Wallet</Layout>
      </div>
    );
  }
}
