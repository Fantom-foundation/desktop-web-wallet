import React, { useState } from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';
import convertIcon from 'src/images/icons/convert.svg';

export default () => (
  <div className={styles.root}>
    <div className={styles.valueWrapper}>
      <p className={styles.value}>
        <span>
          <span className="opacity-5">0</span>
          <h2 className={styles.tokeName}>iBTC</h2>
        </span>
      </p>
      <div className={classnames(styles.convert, 'text-center')}>
        <img src={convertIcon} alt="convert" />
        <p className="m-0">fUSD</p>
      </div>
    </div>
    <div>
      <input type="range" className={styles.input} />
    </div>
  </div>
);
