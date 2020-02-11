import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { MenuIcon } from 'src/view/components/svgIcons';
import LanguageDropDown from './LanguageDropdown';
import logoWhite from 'src/images/logo/fantom-logo-icon-white.svg';
import logo from 'src/images/logo/fantom-logo-icon.svg';
import LogoutIcon from 'src/images/icons/sidebar/logout.svg';

import menus, { tradeLendDefiMenu } from './menus';
import { useTranslation } from 'react-i18next';

const getLinkPath = (name, address) => {
  switch (name) {
    case 'Dashboard':
      return `/account/${address}`;
    case 'Send':
      return `/account/${address}/send`;
    case 'Receive':
      return `/account/${address}/receive`;
    case 'Stake':
      return `/account/${address}/stake`;
    case 'DeFi':
      return `/account/${address}/defi`;
    case 'fTrade':
      return `/account/${address}/f-trade`;
    case 'fLend':
      return `/account/${address}/f-lend`;

    default:
      return '';
  }
};
export default props => {
  const { mainMenu = true } = props;
  const [sidebarActive, setSidebarActive] = useState(false);
  let selectedIndex = menus.findIndex(e => {
    return props.pathname.includes(e.name.toLowerCase());
  });
  if (selectedIndex === -1) {
    selectedIndex = 0;
  }

  const { t } = useTranslation();
  return (
    <>
      <div className={classnames('d-xl-none', styles.header)}>
        {/* <Link to="/">
          <img src={logo} className={styles.logo} alt="Fantom" />
        </Link> */}
        <button
          className={classnames('btn-icon')}
          type="button"
          onClick={() => setSidebarActive(true)}
        >
          <MenuIcon />
        </button>
      </div>

      <div
        className={classnames(styles.sidebarWrapper, {
          [styles.active]: sidebarActive,
        })}
      >
        <div
          className={classnames(styles.root, { [styles.navyMenu]: !mainMenu })}
        >
          <div className={styles.head}>
            <Link to="/">
              <div className={styles.logoWrapper}>
                <img src={logoWhite} alt="Fantom" />
              </div>
            </Link>
            <button
              className={classnames('btn-icon d-xl-none', styles.close)}
              type="button"
              onClick={() => setSidebarActive(false)}
            >
              ×
            </button>
          </div>
          <div className={styles.menusWrapper}>
            <ul className={classnames(styles.mainMenu, styles.menus)}>
              {mainMenu
                ? menus.map(({ name, icon }, index) => (
                    <li
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className={classnames({
                        [styles.active]: index === selectedIndex,
                      })}
                    >
                      <Link
                        to={getLinkPath(name, props.address)}
                        onClick={() => setSidebarActive(false)}
                      >
                        <img src={icon} alt={name} />
                        {t(name.toLowerCase())}
                      </Link>
                    </li>
                  ))
                : tradeLendDefiMenu.map(({ name, icon }, index) => (
                    <li
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className={classnames({
                        [styles.active]: index === selectedIndex,
                      })}
                    >
                      <Link
                        to={getLinkPath(name, props.address)}
                        onClick={() => setSidebarActive(false)}
                      >
                        <img src={icon} alt={name} />
                        {t(name.toLowerCase())}
                      </Link>
                    </li>
                  ))}
            </ul>
            <ul className={classnames(styles.menus)}>
              <li>
                <LanguageDropDown />
              </li>
              <li className="mb-0">
                <a onClick={props.handleLogout}>
                  <img src={LogoutIcon} alt="yh" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
