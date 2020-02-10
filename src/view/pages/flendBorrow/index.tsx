/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Row, Col, Card, Button } from 'reactstrap';
import classnames from 'classnames';
import SearchIcon from 'src/images/dashboard-icons/Archive/search.svg';
import { ArrowUpDownIcon } from 'src/view/components/svgIcons';
import SearchTokenList from 'src/view/pages/fLend/component/tokenList/searchTokenList';
import CircleLineProgress from 'src/view/components/circleLineProgress';
import Tabs from 'src/view/components/tabs';
import TokenRange from 'src/view/components/tokenRange';
import TokenListModal from 'src/view/pages/tokenListModal';
import Input from 'src/view/components/forms/Input';

const overviewData = [
  {
    label: 'Borrow APR',
    value: '5.47%',
  },
  {
    label: 'Price',
    value: '8646.52 fUSD',
  },
  {
    label: 'Borrowed',
    value: '0 iBTC',
  },
  {
    label: 'Interest accumulated',
    value: '0 fUSD',
  },
  {
    label: 'Max borrow',
    value: '0.05616425 iBTC',
  },
  {
    label: 'Collateral ratio',
    value: '0%',
  },
];

const borrowMockData = [
  { label: 'Borrow APR', value: '5.47%' },
  { label: 'Price', value: '8902.46 / iBTC' },
  { label: 'Borrowed amount', value: '499.98 fUSD' },
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
const TokenListModalComponent = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <button type="button" className={styles.tokenlistBtn} onClick={toggle}>
        <div style={{ background: '#f5a623' }} className={styles.circle} />
        iBTC
        <i className="fas fa-caret-right" />
      </button>
      <TokenListModal toggle={toggle} isOpen={modal} />
    </>
  );
};

const Borrow = () => (
  <div>
    <CircleLineProgress
      progress={[
        { text: 'Enter quantity', active: true },
        { text: 'Confirm loan', active: false },
      ]}
    />
    <h4>I want to borrow</h4>
    <TokenListModalComponent />
    <div className="text-right">
      <h4 className="opacity-5">Borrow balance</h4>
      <h4 className="font-weight-semi-bold">500 fUSD</h4>
    </div>
    <TokenRange />
    <div className="text-right">
      <h4 className="opacity-5">Borrow balance</h4>
      <h4 className="font-weight-semi-bold">500 fUSD</h4>
    </div>
    <div>
      <div className="text-center mb-5">
        <h2 className="mb-4">You are borrowing</h2>
        <h1 className="text-navy-blue font-weight-semi-bold">
          0.05616425 iBTC
        </h1>
      </div>
      <div>
        <table className={classnames(styles.table, 'w-100')}>
          {borrowMockData.map(({ label, value }) => (
            <tr>
              <td>
                <h3 className="opacity-5">{label}</h3>
              </td>
              <td className="text-right">
                <h3>{value}</h3>
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
    <div className="text-center">
      <Button
        color={true ? 'secondary' : 'navy-blue'}
        className={classnames({ ['disabled']: true })}
      >
        Borrow iBTC
      </Button>
    </div>
  </div>
);
const Repay = () => (
  <div>
    <CircleLineProgress
      progress={[
        { text: 'Enter quantity', active: true },
        { text: 'Confirm repayment', active: false },
      ]}
    />
    <h4>I want to borrow</h4>

    <TokenListModalComponent />
    <div className="text-right">
      <h4 className="opacity-5">Borrow balance</h4>
      <h4 className="font-weight-semi-bold">500 fUSD</h4>
    </div>
    <TokenRange />
    <div className="text-right">
      <h4 className="opacity-5">Borrow balance</h4>
      <h4 className="font-weight-semi-bold">500 fUSD</h4>
    </div>
    <div>
      <div className="text-center mb-5">
        <h2 className="mb-4">You are repaying</h2>
        <h1 className="text-navy-blue font-weight-semi-bold">
          0.05616425 iBTC
        </h1>
      </div>
      <div>
        <table className={classnames(styles.table, 'w-100')}>
          {repayMockData.map(({ label, value }) => (
            <tr>
              <td>
                <h3 className="opacity-5">{label}</h3>
              </td>
              <td className="text-right">
                <h3>{value}</h3>
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
    <div className="text-center">
      <Button
        color={false ? 'secondary' : 'navy-blue'}
        className={classnames({ ['disabled']: false })}
      >
        Borrow iBTC
      </Button>
    </div>
  </div>
);

export default () => (
  <div className="dashboard-container">
    <Row>
      <Col lg={5} className="mb-5">
        <Card>
          <p className="card-label">Overview</p>
          <div className="text-right">
            {overviewData.map(({ label, value }) => (
              <div>
                <h2 className="mb-1">{value}</h2>
                <p className="card-label">{label}</p>
              </div>
            ))}
          </div>
        </Card>
      </Col>
      <Col lg={7} className="mb-5">
        <Tabs
          tabs={[
            { title: 'Borrow', content: <Borrow /> },
            { title: 'Repay', content: <Repay /> },
          ]}
        />
      </Col>
    </Row>
  </div>
);
