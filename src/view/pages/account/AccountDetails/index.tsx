import React, { FC, useEffect } from 'react';
import { Row, Col, Container, Card } from 'reactstrap';
import { Switch, Route, RouteComponentProps } from 'react-router';

import { IAccount } from '~/redux/account/types';
import { AccountDetailsInfo } from '~/view/components/account/AccountDetailsInfo';
import styles from './styles.module.scss';
import { DialogInfo } from '~/view/components/dialogs/DialogInfo';
import { AccountTransactionsList } from '../AccountTransactionsList';
import Activity from 'src/view/components/activity';
import axios from 'axios';
import { connect } from 'react-redux';
import { selectTransactions } from '~/redux/transactions/selectors';
import * as ACTIONS from '~/redux/transactions/actions';



const overViewMock = [
  { title: 'Price', value: '$0.01025000' },
  { title: 'Market cap', value: '$18,595,766 USD' },
];

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }> &
  typeof mapDispatchToProps & {
    account: IAccount
  };

const mapStateToProps = state => ({
  transactions: selectTransactions(state),
});

const mapDispatchToProps = {
  transactionsGetList: ACTIONS.transactionsGetList,
  transactionsSetPage: ACTIONS.transactionsSetPage,
};

const AccountDetailsRouter: FC<IProps> = ({ 
  account,
  transactions,
  transactionsGetList,
  transactionsSetPage,

}) => {
  useEffect(() => {
    transactionsSetPage(0);
  }, [account.publicAddress, transactionsSetPage]);

  useEffect(() => {
    transactionsGetList(account.publicAddress);
  }, [account.publicAddress, transactionsGetList]);

  if (!account) return null;
  console.log('****accountasds', account)
  // const trans = transactionsGetList(account.publicAddress)
  console.log('*****trans',transactions)
  console.log('*******accountaccount', account)
  // return (
  //   <Container className={styles.wrap}>
  //     <Row className={styles.row}>
  //       <Col md={12} lg={4}>
  //         <AccountDetailsInfo account={account} />
  //       </Col>

  //       <Col md={12} lg={8} className={styles.transactions}>
  //         <AccountTransactionsList account={account} />

  //         <DialogInfo
  //           isOpened={false}
  //           onClose={console.log}
  //           title="Transfer Status"
  //           body="Status text body"
  //         />
  //       </Col>
  //     </Row>
  //   </Container>
  // );

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = `You clicked ${count} times`;
  // });
  return (
    <div>
      <Row>
        <Col xl={7} className="mb-6">
          <Card className="h-100">
            <p className="card-label">Balance</p>
            <div className="d-flex align-items-center justify-content-end mb-3">
              <h1 className="mb-0">{account.balance}</h1>
              <h2 className="mb-0">&nbsp;FTM</h2>
            </div>
            <p className="text-right text-usd">
              {(parseFloat(account.balance) * 0.01025000).toFixed(6)}
              {" "}
              <span>USD</span>
            </p>
          </Card>
        </Col>
        <Col xl={5} className="mb-6">
          <Card className="h-100">
            <p className="card-label ">Overview</p>
            {overViewMock.map(({ title, value }) => (
              <div className="d-flex justify-content-between">
                <h4 className="opacity-7">
                  {title}
:
                </h4>
                <p className="font-weight-semi-bold">{value}</p>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* transactions={transactions} address={account.publicAddress} */}
          <Activity transactions={transactions} address={account.publicAddress} />
        </Col>
      </Row>
    </div>
  );
  // return <p>asdasd</p>;
};



const AccountDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetailsRouter);

export { AccountDetails };