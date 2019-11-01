import React, { useMemo, FC, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import * as styles from './styles.module.scss';

import { Container, Row, Col } from 'reactstrap';
import logo from '~/images/logo/FantomWallet.svg';

import hamburgerBtn from '~/images/icons/hamburger.svg';
import closeBtn from '~/images/icons/close.svg';
import { URLS } from '~/constants/urls';
import classNames from 'classnames';

const mapStateToProps = state => ({
  accountsList: state.accounts.accountsList,
});

type IProps = RouteComponentProps & ReturnType<typeof mapStateToProps> & { isBlurred: boolean };

const DESTINATIONS = {
  create: URLS.ACCOUNT_CREATE,
  restore: URLS.ACCOUNT_RESTORE,
  accounts: /^\/accounts/gi,
};

const LayoutHeaderNavUnconnected: FC<IProps> = ({ location: { pathname }, isBlurred }) => {
  const [is_menu_active, setMenuIsActive] = useState(false);

  const currents = useMemo(
    () =>
      Object.keys(DESTINATIONS).reduce(
        (obj, target) => ({
          ...obj,
          [target]: !!pathname.match(DESTINATIONS[target]),
        }),
        { create: false, restore: false, accounts: false }
      ),
    [pathname]
  );

  const toggleMenu = useCallback(() => {
    setMenuIsActive(!is_menu_active);
  }, [is_menu_active, setMenuIsActive]);

  return (
    <div className={classNames(styles.header, { [styles.blurred]: isBlurred })}>
      <Container>
        <Row>
          <Col className={styles.content}>
            <Link to={URLS.ROOT}>
              <img src={logo} alt="Logo" className={styles.logo} />
            </Link>

            <div className={styles.links}>
              <Link
                to={URLS.ACCOUNT_CREATE}
                className={classNames({ [styles.active]: currents.create })}
              >
                Create Wallet
              </Link>
              <Link
                to={URLS.ACCOUNT_RESTORE}
                className={classNames({ [styles.active]: currents.restore })}
              >
                Restore Wallet
              </Link>
              <Link
                to={URLS.ACCOUNT_LIST}
                className={classNames({ [styles.active]: currents.accounts })}
              >
                Accounts
              </Link>
            </div>

            <div className={styles.burger} onClick={toggleMenu}>
              <img src={hamburgerBtn} alt="menu" />
            </div>
          </Col>
        </Row>
      </Container>

      <div className={classNames(styles.menu, { [styles.active]: is_menu_active })}>
        <div className={styles.close} onClick={toggleMenu}>
          <img src={closeBtn} alt="close" />
        </div>

        <div className={styles.menu_content}>
          <Link
            to={URLS.ACCOUNT_CREATE}
            className={classNames({ [styles.active]: currents.create })}
          >
            Create Wallet
          </Link>
          <Link
            to={URLS.ACCOUNT_RESTORE}
            className={classNames({ [styles.active]: currents.restore })}
          >
            Restore Wallet
          </Link>
          <Link
            to={URLS.ACCOUNT_LIST}
            className={classNames({ [styles.active]: currents.accounts })}
          >
            Accounts
          </Link>
        </div>
      </div>
    </div>
  );
};

const LayoutHeaderNav = connect(mapStateToProps)(withRouter(LayoutHeaderNavUnconnected));

export { LayoutHeaderNav };
