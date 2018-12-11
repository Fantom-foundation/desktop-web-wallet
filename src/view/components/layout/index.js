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
    const { children, noFooter, className } = this.props;
    return (
      <div className={className}>
        <Header />
        {children}
        {!noFooter ? <Footer /> : null}
      </div>
    );
  }
}

Layout.propTypes = {
  className: PropTypes.node,
  children: PropTypes.node,
  noFooter: PropTypes.bool,
};

Layout.defaultProps = {
  className: null,
  children: null,
  noFooter: false,
};
