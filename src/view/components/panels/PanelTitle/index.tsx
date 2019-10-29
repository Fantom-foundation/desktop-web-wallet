import React, { FC, ReactElement } from 'react';
import * as styles from './styles.module.scss';

interface IProps {
  title: string;
  right?: ReactElement;
}

const PanelTitle: FC<IProps> = ({ title, right }) => (
  <div className={styles.panel}>
    <div className={styles.title}>{title}</div>
    {right && <div className={styles.right}>{right}</div>}
  </div>
);

export { PanelTitle };
