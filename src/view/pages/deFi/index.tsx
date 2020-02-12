/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Row, Col, Card, Button } from 'reactstrap';
import FLend from '~/images/dashboard-icons/f-lend.svg';
import FTrade from '~/images/dashboard-icons/f-trade.svg';
import classnames from 'classnames';

export default () => (
  <div className="dashboard-container">
    <h2 className={classnames('text-center mb-4 mb-lg-5', styles.title)}>
      What would you like to do?
    </h2>
    <Row>
      <Col lg={6} className="mb-5">
        <Card className={styles.card}>
          <div className="mb-4">
            <img src={FTrade} alt="fTrade" />
          </div>
          <h3>fTrade</h3>
          <h4 className="mb-4">
            You can trade synthetics directly from your wallet using fUSD and
            FTM.
          </h4>

          <h4 className="mb-4">
            Buy and sell synthetic assets that track the prices of their real
            counterparts.
          </h4>
          <div className="text-left">
            <button type="button" className={styles.link}>
              Go to fTrade
              <i className="fas fa-arrow-right ml-2" />
            </button>
          </div>
        </Card>
      </Col>
      <Col lg={6} className="mb-5">
        <Card className={styles.card}>
          <div className="mb-4">
            <img src={FLend} alt="flend" />
          </div>
          <h3>fLend</h3>
          <h4 className="mb-4">
            You can use your tokens as a liquidity provider for loans and earn
            interest on it.
          </h4>
          <h4 className="mb-4">
            You can also use your tokens as collateral to borrow tokens.
          </h4>
          <div className="text-left">
            <button type="button" className={styles.link}>
              Go to fLend
              <i className="fas fa-arrow-right ml-2" />
            </button>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
);
