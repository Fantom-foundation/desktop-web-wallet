import React from 'react';
import { LayoutHeaderNav } from '~/view/components/layout/LayoutHeaderNav';
import * as styles from './styles.module.scss';

export const LayoutHeader = () => (
  <header id="header">
    <div className={styles.placeholder} />
    <LayoutHeaderNav />
  </header>
);
