import React from 'react';
import { LayoutHeaderNav } from '~/view/components/layout/LayoutHeaderNav';
import * as styles from './styles.module.scss';
import { createPortal } from 'react-dom';

interface IProps {
  isBlurred: boolean;
}

export const LayoutHeader = ({ isBlurred }) => (
  <header id="header">
    <div className={styles.placeholder} />

    {createPortal(<LayoutHeaderNav isBlurred={isBlurred}/>, document.body)}
  </header>
);
