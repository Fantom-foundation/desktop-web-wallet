import React from 'react';
import { Row, Col, Card, Table } from 'reactstrap';
import styles from './styles.module.scss';
import { ArrowUpDownIcon } from 'src/view/components/svgIcons';
import classnames from 'classnames';

import SearchIcon from '../../../images/dashboard-icons/Archive/search.svg';
import TokenList from './component/tokenList';
import SupplyBalance from './component/supplyBalance';
import Collateral from './component/collateral';
import BorrowBalance from './component/borrowBalance';

export default () => (
  <div>
    <Row>
      <Col md={6} lg={4} className={classnames('mb-lg-6 mb-4', styles.order1)}>
        <SupplyBalance />
      </Col>
      <Col md={12} lg={4} className={classnames('mb-lg-6 mb-4', styles.order3)}>
        <Collateral />
      </Col>
      <Col md={6} lg={4} className={classnames('mb-lg-6 mb-4', styles.order2)}>
        <BorrowBalance />
      </Col>
    </Row>
    <Row>
      <Col md={12} lg={6} className="mb-6">
        <Card>
          <Table className={styles.table}>
            <thead className={styles.tableHead}>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                Asset
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: true,
                })}
              >
                APR
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                Balance
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                Supply
              </th>
            </thead>
            <tbody></tbody>
          </Table>
        </Card>
      </Col>
      <Col md={12} lg={6} className="mb-6">
        <Card>
          <Table className={styles.table}>
            <thead className={styles.tableHead}>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                <span>
                  <img src={SearchIcon} width="30" alt="" />
                </span>
                Asset
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: true,
                })}
              >
                Borrow APR
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                Borrowed
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                % of limit
                <ArrowUpDownIcon />
              </th>
            </thead>
            <tbody>
              <TokenList />
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  </div>
);
