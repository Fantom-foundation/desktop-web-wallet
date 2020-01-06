/* eslint-disable react/jsx-one-expression-per-line */
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
import {
  selectAccount,
  selectAccountConnection,
  selectFtmToUsdPrice,
  // selectFtmMarketCap,
} from '~/redux/account/selectors';
import { push as historyPush } from 'connected-react-router';
// import { AccountCreateCredentialForm } from '~/view/components/account/AccountCreateCredentialForm';
import styles from './styles.module.scss';
import { convertFTMValue } from '~/view/general/utilities';

import classnames from 'classnames';
import { RefreshIcon } from 'src/view/components/svgIcons';
import { ServerHttp2Session } from 'http2';

const mapStateToProps = state => ({
  transactions: selectTransactions(state),
  accountData: selectAccount(state),
  connection: selectAccountConnection(state),
  ftmToUsdPrice: selectFtmToUsdPrice(state),
  // ftmMarketCap: selectFtmMarketCap(state),
});
const mapDispatchToProps = {
  accountCreateSetRestoreCredentials:
    ACCOUNT_ACTIONS.accountCreateSetRestoreCredentials,
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
  accountFTMtoUSD: ACCOUNT_ACTIONS.accountFTMtoUSD,
  accountFTMMarketCap: ACCOUNT_ACTIONS.accountFTMMarketCap,
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
  accountFTMMarketCap,
  transactions,
  accountCreateSetRestoreCredentials,
  transactionsGetList,
  ftmToUsdPrice,
  // ftmMarketCap,
  id,
}) => {
  const [marketCap, setMarketCap] = useState('0');
  //   const getBalance = useCallback(
  //     () => accountGetBalance(id),
  //     [id, accountGetBalance]
  //   );

  //   useEffect(() => {
  //     if (is_node_connected) getBalance();
  //   }, [getBalance, is_node_connected]);

  useEffect(() => {
    transactionsGetList(id);
    setInterval(() => {
      accountGetBalance(id);
    }, 5000);
    accountFTMtoUSD();
    accountFTMMarketCap(value => {
      setMarketCap(value);
    });
  }, [
    accountFTMMarketCap,
    accountFTMtoUSD,
    accountGetBalance,
    id,
    transactionsGetList,
  ]);
  const account = accountData && accountData.list && id && accountData.list[id];

  // console.log(ftmMarketCap, '**ftmMarketCap');
  // useEffect(() => {
  //   accountGetBalance(id);

  // }, [accountGetBalance, id]);
  const [spin, setSpin] = useState(false);

  const loadLatestBalance = useCallback(() => {
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 2000);
    accountGetBalance(id);
    transactionsGetList(id);
  }, [accountGetBalance, id, transactionsGetList]);
  const marketCapValue = parseFloat(marketCap).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
          walletCardClassName="px-0"
          push={push}
          onSubmit={accountCreateSetRestoreCredentials}
          list={list}
        />
      </Modal> */}
      <div>
        <Row>
          <Col md={7} className="mb-6">
            <Card className="h-100">
              <div className={styles.refreshBtnWrapper}>
                <button
                  type="button"
                  onClick={loadLatestBalance}
                  className={classnames('btn-icon', styles.refreshBtn, {
                    spin,
                  })}
                >
                  <RefreshIcon />
                </button>
              </div>

              <p className="card-label">Balance</p>
              <div className="d-flex align-items-center justify-content-end mb-3">
                <h1 className={classnames('mb-0', styles.ftmNumber)}>
                  {account && convertFTMValue(parseFloat(account.balance))}
                </h1>
                <h2 className={classnames('mb-0', styles.ftmText)}>
                  &nbsp;FTM
                </h2>
              </div>
              <p className="text-right text-usd">
                ${' '}
                {account &&
                  convertFTMValue(
                    parseFloat(account.balance) * parseFloat(ftmToUsdPrice)
                  )}
                <span> USD</span>
              </p>
            </Card>
          </Col>
          <Col md={5} className="mb-6">
            <Card className="h-100">
              <p className="card-label">Overview</p>

              {/* { title: 'Price', value: '$0.01078000' },
  {title: 'Market cap', value: '$19,620,860 USD' },
                        
             */}
              {/* {overViewMock.map(({ title, value }) => (
                <div className="mb-4 d-flex justify-content-between">
                  <h4 className="m-0 opacity-85">{title}:</h4>
                  <p className={classnames('m-0', styles.infoValue)}>
                    {title === 'Price' ? ftmToUsdPrice : value}
                  </p>
                </div>
              ))} */}
              <div className="mb-4 d-flex justify-content-between">
                <h4 className="m-0 opacity-85">Price:</h4>
                <p className={classnames('m-0', styles.infoValue)}>
                  {ftmToUsdPrice}
                </p>
              </div>
              <div className="mb-4 d-flex justify-content-between">
                <h4 className="m-0 opacity-85">Market cap:</h4>
                <p className={classnames('m-0', styles.infoValue)}>
                  $ {marketCapValue}
                </p>
              </div>
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
