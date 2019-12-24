import React, { FC, useEffect,useMemo, useState, useLayoutEffect } from 'react';
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
import { selectAccount } from '~/redux/account/selectors';
import * as ACCACTIONS from '~/redux/account/actions';



const overViewMock = [
  { title: 'Price', value: '$0.01025000' },
  { title: 'Market cap', value: '$18,595,766 USD' },
];

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }> &
  typeof mapDispatchToProps & {
    account: IAccount,
    list: {},
    id: string
  };

const mapStateToProps = state => ({
  transactions: selectTransactions(state),
  accountData: selectAccount(state),
});

const mapDispatchToProps = {
  transactionsGetList: ACTIONS.transactionsGetList,
  transactionsSetPage: ACTIONS.transactionsSetPage,
  accountGetBalance: ACCACTIONS.accountGetBalance,
};

const AccountDetailsRouter: FC<IProps> = ({ 
  accountData:{list},
  transactions,
  transactionsGetList,
  transactionsSetPage,
  accountGetBalance,
id,
}) => {
  console.log(id, '****listidid')
  const [localId, setLocalId] = useState("");
  const account = useMemo(() => list && id && list[id], [list, id]);
  // useEffect(() => {
  //   transactionsSetPage(0);
  // }, [transactionsSetPage]);

  // useLayoutEffect(() => {
  //   transactionsGetList(id);
  // }, [transactionsGetList, id])

  // useEffect(() => {
  //   transactionsGetList(id);
  // }, [id, transactionsGetList]);
  debugger;
  if (localId !== id) {
    setLocalId(id);
    setTimeout(() => {

      transactionsGetList(id);
      accountGetBalance(id);
    }, 1000)
  }


  if (!account) return null;
  console.log('****accountasds', account)
  // const trans = transactionsGetList(account.publicAddress)
  console.log('*****trans',transactions)
  console.log('*******accountaccount', account)
  
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