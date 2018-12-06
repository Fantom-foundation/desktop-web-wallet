import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../../../../../images/logo/fantom.png';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    const { location } = props;
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      pathname: location.pathname,
    };
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  /**
   * @param {Routing URL} route
   * This method will push the screen to the passed route
   */
  goToPage(route) {
    const { history } = this.props;
    this.setState({
      pathname: route,
    });
    history.push(route);
  }

  render() {
    const { isOpen, pathname } = this.state;
    const { accountsList } = this.props;
    return (
      <div className="nav-holder">
        <Navbar dark expand="md">
          <NavbarBrand href="/">
            <img className="logo" src={logo} alt="logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  className={pathname === '/create-account' ? 'selected' : ''}
                  onClick={() => this.goToPage('/create-account')}
                >
                  Create Wallet
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={pathname === '/restore-account' ? 'selected' : ''}
                  onClick={() => this.goToPage('/restore-account')}
                >
                  Restore Wallet
                </NavLink>
              </NavItem>
              {accountsList.length > 0 && (
                <NavItem>
                  <NavLink
                    className={pathname === '/account-management' ? 'selected' : ''}
                    onClick={() => this.goToPage('/account-management')}
                  >
                    Accounts
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountsList: state.accounts.accountsList,
});

NavigationBar.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  accountsList: PropTypes.oneOfType([PropTypes.array]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default compose(
  connect(mapStateToProps),
  withRouter
)(NavigationBar);
