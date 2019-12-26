import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { MenuIcon } from 'src/view/components/svgIcons';

import logoWhite from 'src/images/logo/fantom-logo-white.svg';
import logo from 'src/images/logo/fantom-logo.svg';

import menus from './menus';

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

    default:
      return '';
  }
};
export default props => {
  const [sidebarActive, setSidebarActive] = useState(false);
  let selectedIndex = menus.findIndex(e => {
    return props.pathname.includes(e.name.toLowerCase());
  });
  if (selectedIndex === -1) {
    selectedIndex = 0;
  }
  return (
    <>
      <div className={classnames('d-xl-none', styles.header)}>
        <img src={logo} className={styles.logo} alt="Fantom" />
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
        <div className={styles.root}>
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
            <ul className={styles.menus}>
              {menus.map(({ name, icon }, index) => (
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
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
