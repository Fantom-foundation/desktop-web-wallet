import React from 'react';
import PropTypes from 'prop-types';
import Header from '~/view/components/layout/header';
import Footer from '~/view/components/layout/footer';

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
