import React from 'react';
import { LayoutHeaderNav } from '~/view/components/layout/LayoutHeaderNav';
import * as styles from './styles.module.scss';
import { createPortal } from 'react-dom';

export const LayoutHeader = () => (
  <header id="header">
    <div className={styles.placeholder} />

    {createPortal(<LayoutHeaderNav />, document.body)}
  </header>
);
