import React, { FC } from 'react';
import { LayoutHeaderNav } from '~/view/components/layout/LayoutHeaderNav';
import styles from './styles.module.scss';
import { createPortal } from 'react-dom';

interface IProps {
  isBlurred: boolean;
}

export const LayoutHeader: FC<IProps> = ({ isBlurred }) => (
  <header id="header">
    <div className={styles.placeholder} />

    {createPortal(<LayoutHeaderNav isBlurred={isBlurred} />, document.body)}
  </header>
);
