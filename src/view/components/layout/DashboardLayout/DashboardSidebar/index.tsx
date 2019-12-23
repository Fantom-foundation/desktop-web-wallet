import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import logo from 'src/images/logo/fantom-logo-white.svg';
import menus from './menus';

const getLinkPath = (name, address) => {
  switch (name) {
    case 'Dashboard':
      return `/account/${address}`;
    case 'Send':
      return `/account/${address}/send`;
    case 'Recieve':
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
  let selectedIndex = menus.findIndex(e => {
    return props.pathname.includes(e.name.toLowerCase());
  });
  if (selectedIndex === -1) {
    selectedIndex = 0;
  }
  return (
    <div className={styles.root}>
      <Link to="/">
        <div className={styles.logoWrapper}>
          <img src={logo} />
        </div>
      </Link>
      <ul className={styles.menus}>
        {menus.map(({ name, icon }, index) => {
          return (
            <li
              key={index}
              className={classnames({
                [styles.active]: index === selectedIndex,
              })}
            >
              <Link to={getLinkPath(name, props.address)}>
                <img src={icon} />
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
