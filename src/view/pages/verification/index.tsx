import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { CreateWalletCard } from '../../components/cards';
import styles from './styles.module.scss';

export default () => {
  return (
    <div className={styles.verification}>
      <h3 className="font-weight-semi-bold">Verification</h3>
      <p className="text-dark-grey-blue">
          Please select the words in the correct order to verify your mnemonic
          phrase.
      </p>
    </div>
  );
};
