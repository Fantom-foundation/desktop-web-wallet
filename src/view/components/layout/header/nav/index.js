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

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
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
    history.push(route);
  }

  render() {
    const { isOpen } = this.state;
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
                <NavLink onClick={() => this.goToPage('/restore-account')}>Open Wallet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.goToPage('/create-account')}>New Wallet</NavLink>
              </NavItem>
              {accountsList.length > 0 && (
                <NavItem>
                  <NavLink onClick={() => this.goToPage('/account-management')}>
                    View Address
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
};

export default compose(
  connect(mapStateToProps),
  withRouter
)(NavigationBar);
