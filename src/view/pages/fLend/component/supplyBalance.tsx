import React from 'react';
import { Card } from 'reactstrap';
import styles from './styles.module.scss';

export default () => (
  <Card className="h-100">
    <p className="fcard-label mb-0">
      Supply balance
      <span className={`${styles.infoIcon} ml-2`}>
        <i className="fas fa-info-circle" />
        {/* <div className={styles.tooltipWrapper}>
                <p className="mb-0">
                  The keystore file will contain your encrypted private key.
                  <br />
                  You’ll need the password to decrypt it. Don’t lose them!
                </p>
              </div> */}
      </span>
    </p>
    <div className={styles.balanceCard}>
      <div>
        <h3 className="pt-3">0 fUSD</h3>
        <h4 className="opacity-5 mb-3 font-weight-semi-bold">Earning</h4>
      </div>
      <div>
        <h3 className="pt-3">500.00 fUSD</h3>
        <h4 className="opacity-5 mb-3 font-weight-semi-bold">Supply balance</h4>
      </div>
    </div>
  </Card>
);
