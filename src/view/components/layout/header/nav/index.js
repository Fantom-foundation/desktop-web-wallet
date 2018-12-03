import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
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

  goToPage(route) {
    const SELF = this;
    const { history } = SELF.props;
    history.push(route);
  }

  render() {
    const SELF = this;
    const { isOpen } = this.state;
    const { accountsList } = SELF.props;
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

export default compose(
  connect(mapStateToProps),
  withRouter
)(NavigationBar);
