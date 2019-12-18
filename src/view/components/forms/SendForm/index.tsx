import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import DashboardInput from '../DashboardInput';

export default () => (
  <div className={classnames('card', styles.card)}>
    <h2 className={styles.title}>Send FTM</h2>
    <div className={styles.inputsWrapper}>
      <DashboardInput label="Amount" placeholder="Enter amount" />
      <DashboardInput label="To address" placeholder="Enter address" />
      <DashboardInput label="Memo (optional)" placeholder="Enter memo" />
      <DashboardInput
        label="Amount"
        placeholder="Enter amount"
        error={{
          isError: true,
          errorText:
            'This amount exceeds your balance. Please enter a lower amount',
        }}
      />
      <DashboardInput
        label="To address"
        error={{
          isError: true,
          errorText: 'Enter a valid FTM address',
        }}
        placeholder="Enter address"
      />
      <DashboardInput label="Memo (optional)" placeholder="Enter memo" />
    </div>
    <div>
      <button type="button">Send</button>
      <button type="button">Clear All</button>
    </div>
  </div>
);
