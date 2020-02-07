/* eslint-disable react/no-multi-comp */
import React from 'react';
import styles from './styles.module.scss';
import { Row, Col, Card } from 'reactstrap';
import CircleLineProgress from '../../components/circleLineProgress';
import Tabs from '../../components/tabs';

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

const Borrow = () => (
  <div>
    <CircleLineProgress
      progress={[
        { text: 'Enter quantity', active: true },
        { text: 'Confirm loan', active: false },
      ]}
    />
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
