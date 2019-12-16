import React, { FC } from 'react';
import { LayoutHeaderNav } from '~/view/components/layout/LayoutHeaderNav';
import { Link } from 'react-router-dom';
import logo from '~/images/logo/fantom-logo-white.svg';
import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { URLS } from '~/constants/urls';
import { getURL } from '~/utility/dom';
interface IProps {
  isBlurred: boolean;
}

export const LayoutHeader: FC<IProps> = ({ isBlurred }) => (
  <header id="header" className={styles.header}>
    <div>
      <Link to={URLS.ROOT} className={styles.logo}>
        <img src={getURL(logo)} alt="Logo" />
      </Link>
    </div>
    {/* <div className={styles.placeholder} />

    {createPortal(<LayoutHeaderNav isBlurred={isBlurred} />, document.body)} */}
  </header>
);
