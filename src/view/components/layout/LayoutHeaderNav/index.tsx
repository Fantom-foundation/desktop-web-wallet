/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '~/images/logo/FantomWallet.svg';

import hamburgerBtn from '~/images/icons/hamburger.svg';
import closeBtn from '~/images/icons/close.svg';

const mapStateToProps = state => ({
  accountsList: state.accounts.accountsList,
});

type IProps = RouteComponentProps &
  ReturnType<typeof mapStateToProps> & {
    isShow: boolean;
  };

type IState = {
  isShow: boolean;
  pathname: string;
  closing: boolean;
  windowWidth: number;
};

export class LayoutHeaderNavUnconnected extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    const { location } = props;

    this.state = {
      isShow: false,
      pathname: location.pathname,
      closing: false,
      windowWidth: 1900,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize); // eslint-disable-line
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize); // eslint-disable-line
    document.body.className = document.body.className.replace('no-overflow', ''); // eslint-disable-line
  }

  toggleNavbar = e => {
    e.preventDefault();
    this.setState({ closing: true });
    const { isShow } = this.state;
    if (isShow) {
      document.body.className = document.body.className.replace('no-overflow', ''); // eslint-disable-line
    }
    setTimeout(() => this.setState({ isShow: !isShow, closing: false }), 400);
  };

  closeSidebar = () => {
    document.body.className = document.body.className.replace('no-overflow', ''); // eslint-disable-line
    this.setState({ closing: true });
    setTimeout(() => this.setState({ isShow: false, closing: false }), 400);
  };

  handleResize = () =>
    this.setState({
      // eslint-disable-next-line no-undef
      windowWidth: window.innerWidth,
    });

  /**
   * @param {Routing URL} route
   * This method will push the screen to the passed route
   */
  goToPage(route) {
    this.closeSidebar();
    const { history } = this.props;
    this.setState({
      pathname: route,
    });
    history.push(route);
  }

  render() {
    const { isShow, pathname, windowWidth, closing } = this.state;
    const { accountsList } = this.props;
    if (isShow) {
      document.body.className += 'no-overflow'; // eslint-disable-line
    } else {
      document.body.className = document.body.className.replace('no-overflow', ''); // eslint-disable-line
    }

    return (
      <div className="nav-holder">
        <Navbar dark expand="md">
          <NavbarBrand onClick={() => this.goToPage('/')} className="pointer">
            <img className="logo" src={logo} alt="logo" />
          </NavbarBrand>

          <button
            type="button"
            className="btn open"
            style={{ backgroundImage: `url(${hamburgerBtn})` }}
            onClick={this.toggleNavbar}
          />

          {isShow && (
            <button
              type="button"
              className={`btn close ${closing && 'dim'}`}
              style={{ backgroundImage: `url(${closeBtn})` }}
              onClick={this.toggleNavbar}
            />
          )}

          {windowWidth >= 768 || isShow ? (
            <Collapse className={closing ? 'closing' : ''} navbar>
              <div className="overlay" onClick={this.toggleNavbar} />
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink
                    className={pathname === '/account/create' ? 'selected' : ''}
                    onClick={() => this.goToPage('/account/create')}
                  >
                    Create Wallet
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={pathname === '/account/restore' ? 'selected' : ''}
                    onClick={() => this.goToPage('/account/restore')}
                  >
                    Restore Wallet
                  </NavLink>
                </NavItem>
                {accountsList.length > 0 && (
                  <NavItem>
                    <NavLink
                      className={pathname === '/accounts' ? 'selected' : ''}
                      onClick={() => this.goToPage('/accounts')}
                    >
                      Accounts
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
          ) : null}
        </Navbar>
      </div>
    );
  }
}

const LayoutHeaderNav = connect(mapStateToProps)(withRouter(LayoutHeaderNavUnconnected));

export { LayoutHeaderNav };
