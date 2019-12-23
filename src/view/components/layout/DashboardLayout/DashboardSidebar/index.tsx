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
    case 'Receive':
      return `/account/${address}/recieve`;
    case 'Stake':
      return ``;
    case 'Logout':
      return `/`;
    default:
      return '';
  }
};
export default props => {
  console.log('*****propswd ', props);
  return (
    <div className={styles.root}>
      <div className={styles.logoWrapper}>
        <img src={logo} />
      </div>
      <ul className={styles.menus}>
        {menus.map(({ name, icon }, index) => (
          <li
            key={index}
            className={classnames({ [styles.active]: index === 0 })}
          >
            <Link to={getLinkPath(name, props.address)}>
              <img src={icon} />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
