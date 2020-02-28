import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '~/images/logo/fantom-logo-white.svg';
import styles from './styles.module.scss';
import { URLS } from '~/constants/urls';
import { getURL } from '~/utility/dom';

interface IProps {
  isBlurred: boolean;
}

export const LayoutHeader: FC<IProps> = () => (
  <header id="header" className={styles.header}>
    <div>
      <Link to={URLS.ROOT} className={styles.logo}>
        <img src={getURL(logo)} alt="Logo" />
      </Link>
    </div>
  </header>
);
