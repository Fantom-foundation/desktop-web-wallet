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
      return `/account/${address}/recieve`;
    case 'Stake':
      return `/account/${address}/stake`;
    case 'Logout':
      return `/`;
    default:
      return '';
  }
};
export default props => {
  const [sidebarActive, setSidebarActive] = useState(false);
  return (
    <>
      <div className={classnames('d-xl-none', styles.header)}>
        <img src={logo} alt="Fantom" />
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
          <div className={styles.logoWrapper}>
            <img src={logoWhite} alt="Fantom" />
            <button
              className={classnames('btn-icon', styles.close)}
              type="button"
              onClick={() => setSidebarActive(false)}
            >
              ×
            </button>
          </div>
          <ul className={styles.menus}>
            {menus.map(({ name, icon }, index) => (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={classnames({ [styles.active]: index === 0 })}
              >
                <Link to={getLinkPath(name, props.address)}>
                  <img src={icon} alt={name} />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
