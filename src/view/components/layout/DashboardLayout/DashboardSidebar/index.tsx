import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import logo from 'src/images/logo/fantom-logo-white.svg';
import menus from './menus';
export default () => (
  <div className={styles.root}>
    <div className={styles.logoWrapper}>
      <img src={logo} />
    </div>
    <ul className={styles.menus}>
      {menus.map(({ name, link, icon }, index) => (
        <li
          key={index}
          className={classnames({ [styles.active]: index === 0 })}
        >
          <Link to={link}>
            <img src={icon} />
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
