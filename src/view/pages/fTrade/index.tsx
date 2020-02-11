/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import styles from './styles.module.scss';
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
} from 'reactstrap';
import classnames from 'classnames';

import CircleLineProgress from 'src/view/components/circleLineProgress';
import Tabs from 'src/view/components/tabs';
import Fantom from 'src/images/dashboard-icons/Archive/fantom-active.svg';
import Dollar from 'src/images/dashboard-icons/Archive/dollar.svg';
import SearchInput from 'src/view/components/forms/searchInput';
import BuyList from 'src/view/pages/fLend/component/tokenList/buyList';

const overviewData = [
  {
    icon: Fantom,
    value: '150,615.22 FTM',
  },
  {
    icon: Dollar,
    value: '500 CSDT',
  },
  {
    icon: Fantom,
    value: '500 fUSD',
  },
];
const repayMockData = [
  { label: 'Price', value: '9500.45 / iBTC' },
  { label: 'Current value of your loan', value: '550 fUSD' },
  { label: 'Interest accumulated', value: '2 fUSD' },
  { label: 'Fee', value: '0.02 fUSD' },
  { label: 'You will receive', value: '547.98 fUSD' },
];

const Buy = () => (
  <div>
    <div className="m-4 mb-5">
      <CircleLineProgress
        progress={[
          { text: 'Choose a token', active: true },
          { text: 'Enter quantity', active: false },
          { text: 'Confirm purchase', active: false },
        ]}
      />
    </div>

    <h4>I want to buy</h4>
    <button type="button" className={styles.tokenlistBtn}>
      <div style={{ background: '#f5a623' }} className={styles.circle} />
      iBTC
      <i className="fas fa-caret-right" />
    </button>
    <div className="text-right">
      <h4 className="opacity-5">Balance</h4>
      <h4>500 fUSD</h4>
    </div>
  </div>
);
const Sell = () => (
  <div>
    <CircleLineProgress
      progress={[
        { text: 'Enter quantity', active: true },
        { text: 'Confirm repayment', active: false },
      ]}
    />
    <h4>I want to borrow</h4>

    <button type="button" className={styles.tokenlistBtn}>
      <div style={{ background: '#f5a623' }} className={styles.circle} />
      iBTC
      <i className="fas fa-caret-right" />
    </button>
    <div className="text-right">
      <h4 className="opacity-5">Borrow balance</h4>
      <h4>500 fUSD</h4>
    </div>
  </div>
);

export default () => (
  <>
    <Row>
      <Col md={4} lg={3} className="mb-5 order2">
        <Card>
          <p className="card-label mb-4 pb-2">Balances</p>
          <div className="">
            {overviewData.map(({ icon, value }) => (
              <div className={styles.balance}>
                <img src={icon} alt={icon} />
                <h4 className="mb-1">{value}</h4>
              </div>
            ))}
          </div>
        </Card>
      </Col>
      <Col md={8} lg={6} className="mb-5 order1">
        <Tabs
          tabs={[
            { title: 'Buy', content: <Buy /> },
            { title: 'Sell', content: <Sell /> },
          ]}
        />
      </Col>
    </Row>
    <Row>
      <Col md={8} lg={6} className="mb-5">
        <Card className={styles.buyCard}>
          <div className={styles.header}>
            <h2>
              <i className="fas fa-chevron-left" />
              Buy
            </h2>
          </div>
          <SearchInput />
          <div className={styles.buyTableWrapper}>
            <Table className={classnames('tokenTable', styles.buyTable)}>
              <BuyList />
            </Table>
          </div>
        </Card>
      </Col>
    </Row>
  </>
);
