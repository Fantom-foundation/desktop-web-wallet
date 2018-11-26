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
    const { children, noFooter } = this.props;
    return (
      <>
        <Header />
        {children}
        {!noFooter ? <Footer /> : null}
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  noFooter: PropTypes.bool,
};

Layout.defaultProps = {
  children: null,
  noFooter: false,
};
