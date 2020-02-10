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
import SearchIcon from 'src/images/dashboard-icons/Archive/search.svg';
import { ArrowUpDownIcon } from 'src/view/components/svgIcons';
import SearchTokenList from 'src/view/pages/fLend/component/tokenList/searchTokenList';
import CircleLineProgress from 'src/view/components/circleLineProgress';
import Tabs from 'src/view/components/tabs';
import TokenRange from 'src/view/components/tokenRange';
import TokenListModal from 'src/view/pages/tokenListModal';

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
      <h4>500 fUSD</h4>
    </div>
    <TokenRange />
    <div className="text-right">
      <h4 className="opacity-5">Borrow balance</h4>
      <h4>500 fUSD</h4>
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
      <h4>500 fUSD</h4>
    </div>
    <TokenRange />
    <div className="text-right">
      <h4 className="opacity-5">Borrow balance</h4>
      <h4>500 fUSD</h4>
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
