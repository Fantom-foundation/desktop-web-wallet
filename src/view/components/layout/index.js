import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

export default class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};
