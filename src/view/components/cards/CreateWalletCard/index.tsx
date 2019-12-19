import React from 'react';
import { Card } from 'reactstrap';
import styles from './styles.module.scss';
import classnames from 'classnames';

export default ({ children }) => (
  <div className={styles.root}>
    <Card className={classnames('p-0', styles.card)}>
      <div className={styles.head}>
        <h2 className="text-white w-100 m-0">Create a new wallet</h2>
      </div>
      <div className={styles.body}>{children}</div>
    </Card>
  </div>
);
