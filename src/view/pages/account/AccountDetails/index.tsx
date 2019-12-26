import React, {
  FC,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useLayoutEffect,
} from 'react';
import { Row, Col, Container, Card, Modal } from 'reactstrap';
import { IAccount } from '~/redux/account/types';
import Activity from 'src/view/components/activity';
import axios from 'axios';
import { selectTransactions } from '~/redux/transactions/selectors';
import * as ACTIONS from '~/redux/transactions/actions';

import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccount , selectAccountConnection, selectFtmToUsdPrice } from '~/redux/account/selectors';
import { push as historyPush } from 'connected-react-router';
import { AccountCreateCredentialForm } from '~/view/components/account/AccountCreateCredentialForm';
import styles from './styles.module.scss';
import { convertFTMValue } from "~/view/general/utilities"

import classnames from 'classnames';

const overViewMock = [
  { title: 'Price', value: '$0.01078000' },
  { title: 'Market cap', value: '$19,620,860 USD' },
];

const mapStateToProps = state => ({
  transactions: selectTransactions(state),
  accountData: selectAccount(state),
  connection: selectAccountConnection(state),
  ftmToUsdPrice: selectFtmToUsdPrice(state),

});
const mapDispatchToProps = {
  accountCreateSetRestoreCredentials:
    ACCOUNT_ACTIONS.accountCreateSetRestoreCredentials,
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
  accountFTMtoUSD: ACCOUNT_ACTIONS.accountFTMtoUSD,
  push: historyPush,
  transactionsGetList: ACTIONS.transactionsGetList,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {
    account: IAccount;
    id: string;
  };
  // ftmToUsd
const AccountDetailsDashboard: FC<IProps> = ({
  push,
  connection: { is_node_connected, error },
  accountData,
  accountGetBalance,
  accountFTMtoUSD,
  transactions,
  accountCreateSetRestoreCredentials,
  transactionsGetList,
  ftmToUsdPrice,
  id,
 }) => {
//   const getBalance = useCallback(
//     () => accountGetBalance(id),
//     [id, accountGetBalance]
//   );

//   useEffect(() => {
//     if (is_node_connected) getBalance();
//   }, [getBalance, is_node_connected]);
console.log(ftmToUsdPrice, '****ftmToUsdPrice')



  useEffect(() => {
    transactionsGetList(id);
    accountGetBalance(id);
    accountFTMtoUSD()
  }, [accountFTMtoUSD, accountGetBalance, id, transactionsGetList]);
  const account = accountData && accountData.list && id && accountData.list[id];

  console.log(account, '**accountaccountaccount');
  // useEffect(() => {
  //   accountGetBalance(id);

  // }, [accountGetBalance, id]);
  return (
    <div>
      {/* <Modal
        isOpen={false}
        className={classnames(
          'modal-dialog-centered',
          styles.createWalletModal
        )}
      >
        <AccountCreateCredentialForm
          // isModal={true}
          push={push}
          onSubmit={accountCreateSetRestoreCredentials}
          list={list}
        />
      </Modal> */}
      <div>
        <Row>
          <Col xl={7} className="mb-6">
            <Card className="h-100">
              <p className="card-label">Balance</p>
              <div className="d-flex align-items-center justify-content-end mb-3">
                <h1 className="mb-0">{ account && convertFTMValue(parseFloat(account.balance))}</h1>
                <h2 className="mb-0">&nbsp;FTM</h2>
              </div>
              <p className="text-right text-usd">
                {account && convertFTMValue(parseFloat(account.balance) * parseFloat(ftmToUsdPrice)) }
                <span> USD</span>
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
                  <p className="font-weight-semi-bold">{title === 'Price' ? ftmToUsdPrice : value}</p>
                </div>
              ))}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Activity transactions={transactions} address={id} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

const AccountDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountDetailsDashboard));

export { AccountDetails };
