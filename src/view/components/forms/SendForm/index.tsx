import React from 'react';
import { Button } from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';
import DashboardInput from '../DashboardInput';

export default () => (
  <div className={classnames('card', styles.card)}>
    <h2 className={styles.title}>Send FTM</h2>
    <div className={styles.inputsWrapper}>
      <DashboardInput
        label="Amount"
        rightLabel="Entire balance"
        placeholder="Enter amount"
      />
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
        rightLabel="Entire balance"
        error={{
          isError: true,
          errorText: 'Enter a valid FTM address',
        }}
        placeholder="Enter address"
      />
      <DashboardInput label="Memo (optional)" placeholder="Enter memo" />
    </div>
    <div className={styles.btnWrapper}>
      <Button className={classnames(styles.btn, styles.send)}>Send</Button>
      <Button
        color="topaz"
        className={classnames(styles.btn, styles.clear, 'border-0 outlined')}
      >
        Clear All
      </Button>
    </div>
  </div>
);
