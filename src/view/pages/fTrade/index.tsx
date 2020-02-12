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
} from 'reactstrap';
import classnames from 'classnames';

import CircleLineProgress from 'src/view/components/circleLineProgress';
import Tabs from 'src/view/components/tabs';
import Fantom from 'src/images/dashboard-icons/Archive/fantom-active.svg';
import Dollar from 'src/images/dashboard-icons/Archive/dollar.svg';
import SearchInput from 'src/view/components/forms/searchInput';
import BuyList from 'src/view/pages/fLend/component/tokenList/buyList';
import convertIcon from 'src/images/icons/convert.svg';
import Input from 'src/view/components/forms/Input';

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
const borrowMockData = [
  { label: 'Price', value: '$8902.46 / sBTC' },
  { label: 'Purchase', value: '499.98 fUSD' },
  { label: 'Fee', value: '0.02 fUSD' },
  { label: 'Total', value: '500 fUSD' },
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
      <h3 className="m-token mb-0">
        <span
          className={classnames('token', styles.circle)}
          style={{ background: 'rgb(245, 166, 35)' }}
        />
        iBTC
      </h3>
    </button>

    <div className="d-flex justify-content-between align-items-center">
      <div className="text-left">
        <h4 className="opacity-5">Price</h4>
        <h3>$8902.46</h3>
      </div>
      <div className="text-right">
        <h4 className="opacity-5">Balance</h4>
        <h3>500 fUSD</h3>
      </div>
    </div>
    <div className={styles.valueWrapper}>
      <p className={classnames('mb-0', styles.value)}>
        <span>
          <span className="opacity-5">0</span>
          <h2 className={styles.tokeName}>fUSD</h2>
        </span>
      </p>
      <div className={classnames(styles.convert, 'text-center')}>
        <img src={convertIcon} alt="convert" />
        <p className="m-0">sBTC</p>
      </div>
    </div>
    <div className={styles.rangeBtnWrapper}>
      <Button color="light">25%</Button>
      <Button color="light">50%</Button>
      <Button color="light">75%</Button>
      <Button color="light">100%</Button>
    </div>

    <div>
      <div className="text-center mb-5">
        <h2 className="mb-4 position-relative">
          <button className={classnames(styles.backBtn, 'btn-icon')}>
            <i className="fas fa-chevron-left" />
          </button>
          You are buying
        </h2>
        <h1 className="text-navy-blue font-weight-semi-bold">
          0.05616425 iBTC
        </h1>
      </div>
      <div>
        <table className={classnames(styles.table, 'w-100')}>
          {borrowMockData.map(({ label, value }) => (
            <tr>
              <td>
                <h3 className="opacity-5 mb-4">{label}</h3>
              </td>
              <td className="text-right">
                <h3 className="mb-4">{value}</h3>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div>
        <Input
          label="Password"
          type="password"
          handler={() => {}}
          isError=""
          errorMsg=""
        />
      </div>
    </div>
    <div className="text-center mb-4">
      <Button color="secondary" className="disabled">
        Buy sBTC
      </Button>
    </div>
  </div>
);
const Sell = () => (
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

    <h4>I want to sell</h4>

    <button type="button" className={styles.tokenlistBtn}>
      <h3 className="m-token mb-0">
        <span
          className={classnames('token', styles.circle)}
          style={{ background: 'rgb(245, 166, 35)' }}
        />
        iBTC
      </h3>
    </button>

    <div className="d-flex justify-content-between align-items-center">
      <div className="text-left">
        <h4 className="opacity-5">Price</h4>
        <h3>$8902.46</h3>
      </div>
      <div className="text-right">
        <h4 className="opacity-5">Balance</h4>
        <h3>500 fUSD</h3>
      </div>
    </div>
    <div className={styles.valueWrapper}>
      <p className={classnames('mb-0', styles.value)}>
        <span>
          <span className="opacity-5">0</span>
          <h2 className={styles.tokeName}>fUSD</h2>
        </span>
      </p>
      <div className={classnames(styles.convert, 'text-center')}>
        <img src={convertIcon} alt="convert" />
        <p className="m-0">sBTC</p>
      </div>
    </div>
    <div className={styles.rangeBtnWrapper}>
      <Button color="light">25%</Button>
      <Button color="light">50%</Button>
      <Button color="light">75%</Button>
      <Button color="light">100%</Button>
    </div>
    <div className="text-center mb-4">
      <Button color="secondary" className="disabled">
        Buy sBTC
      </Button>
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
        <Card className={classnames('mt-5', styles.buyCard)}>
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
