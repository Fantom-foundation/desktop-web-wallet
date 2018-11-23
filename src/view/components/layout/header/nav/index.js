import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../../../../../images/logo/fantom.png';

export default class Example extends React.Component {
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

  render() {
    const { isOpen } = this.state;
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
                <NavLink href="#">Open Wallet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">New Wallet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">View Address</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
