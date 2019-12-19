/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Card } from 'reactstrap';
import { SendForm } from '../../../components/forms';
import classname from 'classnames';
import {
  CopyIcon,
  CheckCircleIcon,
  ErrorCircleIcon,
} from 'src/view/components/svgIcons';
import styles from './styles.module.scss';

export default () => (
  <div>
    <h3 className="mb-3 pb-1 opacity-5 font-weight-semi-bold">Balance</h3>
    <h2 className="mb-5">200,756,680.84 FTM</h2>
    <SendForm />
    <div>
      <Card className={classname(styles.card, 'mb-5 mt-5')}>
        <h2>Transaction sent!</h2>
        <div className={classname(styles.iconGap, styles.hash)}>
          <a href="#">219105220504b7b9a489438b3a504b7b9a4</a>
          <button className={styles.copyBtn} type="button">
            <CopyIcon />
          </button>
        </div>
        <div>
          <CheckCircleIcon />
        </div>
      </Card>
    </div>
    <div>
      <Card className={classname(styles.card, 'mb-5')}>
        <h2 className={styles.iconGap}>
          Something went wrong.
          <br />
          Please try again.
        </h2>
        <div>
          <ErrorCircleIcon />
        </div>
      </Card>
    </div>
  </div>
);
