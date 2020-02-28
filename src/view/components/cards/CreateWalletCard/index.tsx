import React from 'react';
import { Card } from 'reactstrap';
import styles from './styles.module.scss';
import classnames from 'classnames';

export default ({ handleClose = () => {}, children, className = '', title = 'Create a new wallet' }) => (
  <div className={classnames(styles.root, className)}>
    <Card className={classnames('p-0', styles.card)}>
      <div className={styles.head}>
        <h2 className="text-white w-100 m-0">{title}</h2>
        <button type="submit" className={classnames('btn-icon', styles.close)} onClick={() => handleClose()}>&times;</button>
      </div>
      <div className={styles.body}>{children}</div>
    </Card>
  </div>
);

