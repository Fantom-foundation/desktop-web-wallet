import React from 'react';
import { Card, Button } from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';

export default () => (
  <Card className="py-5">
    <div className="text-center">
      <h2 className="mb-5">What would you like to do?</h2>
      <div
        className={classnames(
          styles.btnWrapper,
          'mx-auto d-flex justify-content-between'
        )}
      >
        <Button color="darkish-pink" className={classnames('outlined')}>
          Unstake
        </Button>
        <Button color="primary" className={classnames('outlined')}>
          Claim rewards
        </Button>
      </div>
    </div>
  </Card>
);
