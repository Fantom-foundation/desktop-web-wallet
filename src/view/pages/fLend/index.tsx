import React, { useState } from 'react';
import { Row, Col, Card, Table } from 'reactstrap';
import styles from './styles.module.scss';
import { ArrowUpDownIcon } from 'src/view/components/svgIcons';
import classnames from 'classnames';

import SearchIcon from '../../../images/dashboard-icons/Archive/search.svg';
import SupplyBalance from './component/supplyBalance';
import Collateral from './component/collateral';
import BorrowBalance from './component/borrowBalance';
import BalanceList from './component/tokenList/balanceList';
import BorrowList from './component/tokenList/borrowList';
import SupplyBalanceModal from 'src/view/components/Modal/ModalContent/SupplyBalance';
import BorrowBalanceModal from 'src/view/components/Modal/ModalContent/BorrowBalance';
import CollateralModal from 'src/view/components/Modal/ModalContent/Collateral';
import CollateralError from 'src/view/components/Modal/ModalContent/CollateralError';
import TokenListModal from 'src/view/pages/tokenListModal';

export default () => {
  const [tokenSearchModal, setTokenSearchModal] = useState(false);
  const tokenSearchModalToggle = () => setTokenSearchModal(!tokenSearchModal);
  return (
    <div>
      <Row>
        <Col md={6} lg={4} className="mb-lg-6 mb-4 order1">
          <SupplyBalance />
        </Col>
        <Col md={12} lg={4} className="mb-lg-6 mb-4 order3">
          <Collateral />
        </Col>
        <Col md={6} lg={4} className="mb-lg-6 mb-4 order2">
          <BorrowBalance />
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={6} className="mb-4">
          <Card className={classnames(styles.card, 'p-0')}>
            <Table className="tokenTable">
              <thead className="tableHead">
                <th
                  className={classnames({
                    [styles.up]: false,
                    [styles.down]: false,
                  })}
                >
                  <div className="tableHeading">
                    Asset
                    <ArrowUpDownIcon />
                  </div>
                </th>
                <th
                  className={classnames({
                    [styles.up]: false,
                    [styles.down]: true,
                  })}
                >
                  <div className="tableHeading">
                    APR
                    <ArrowUpDownIcon />
                  </div>
                </th>
                <th
                  className={classnames({
                    [styles.up]: false,
                    [styles.down]: false,
                  })}
                >
                  <div className="tableHeading">
                    Balance
                    <ArrowUpDownIcon />
                  </div>
                </th>
                <th
                  className={classnames({
                    [styles.up]: false,
                    [styles.down]: false,
                  })}
                >
                  <div className="tableHeading">Supply</div>
                </th>
              </thead>
              <tbody>
                <BalanceList />
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col md={12} lg={6} className="mb-4">
          <Card className={classnames(styles.card, 'p-0')}>
            <Table className="tokenTable">
              <thead className="tableHead">
                <th
                  className={classnames({
                    [styles.up]: false,
                    [styles.down]: false,
                  })}
                >
                  <div className="tableHeading">
                    <button
                      className="btn-icon"
                      onClick={tokenSearchModalToggle}
                    >
                      <img src={SearchIcon} width="30" alt="" />
                    </button>
                    Asset
                    <ArrowUpDownIcon />
                  </div>
                </th>
                <th
                  className={classnames({
                    [styles.up]: false,
                    [styles.down]: true,
                  })}
                >
                  <div className="tableHeading">
                    Borrow APR
                    <ArrowUpDownIcon />
                  </div>
                </th>
                <th
                  className={classnames({
                    [styles.up]: false,
                    [styles.down]: false,
                  })}
                >
                  <div className="tableHeading">
                    Borrowed
                    <ArrowUpDownIcon />
                  </div>
                </th>
                <th
                  className={classnames({
                    [styles.up]: false,
                    [styles.down]: false,
                  })}
                >
                  <div className="tableHeading">
                    % of limit
                    <ArrowUpDownIcon />
                  </div>
                </th>
              </thead>
              <tbody>
                <BorrowList />
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      <TokenListModal
        isOpen={tokenSearchModal}
        toggle={tokenSearchModalToggle}
      />
      <SupplyBalanceModal isOpen={false} />
      <BorrowBalanceModal isOpen={false} />
      <CollateralModal isOpen={false} />
      <CollateralError isOpen={false} />
    </div>
  );
};
