import React from 'react';
import { Card } from 'reactstrap';
import styles from './styles.module.scss';

export default () => (
  <Card className="h-100">
    <p className="fcard-label mb-0">
      Borrow balance
      <span className={`${styles.infoIcon} ml-2`}>
        <i className="fas fa-info-circle" />
      </span>
    </p>
    <div className={styles.balanceCard}>
      <div>
        <h3 className="pt-3">500.00 fUSD </h3>
        <h4 className="opacity-5 mb-3 font-weight-semi-bold">Borrow limit</h4>
      </div>
      <div>
        <h3 className="pt-3">0 fUSD</h3>
        <h4 className="opacity-5 mb-3 font-weight-semi-bold">Borrow balance</h4>
      </div>
    </div>
  </Card>
);
