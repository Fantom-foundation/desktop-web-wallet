/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-one-expression-per-line */
import React, {
  FC,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { Row, Col, Card } from 'reactstrap';
import { IAccount } from '~/redux/account/types';
import Activity from 'src/view/components/activity';
import { 
  selectTransactionsDetails,
  selectTransactions,
} from '~/redux/transactions/selectors';
import * as ACTIONS from '~/redux/transactions/actions';

import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import {
  selectAccount,
  selectFtmToUsdPrice,
} from '~/redux/account/selectors';
import { useTranslation } from "react-i18next";

import { push as historyPush } from 'connected-react-router';
import styles from './styles.module.scss';
import { convertFTMValue } from '~/view/general/utilities';

import classnames from 'classnames';
import { RefreshIcon } from 'src/view/components/svgIcons';

const mapStateToProps = state => ({
  transactions: selectTransactions(state),
  accountData: selectAccount(state),
  ftmToUsdPrice: selectFtmToUsdPrice(state),
  transactionHashDetails: selectTransactionsDetails(state),
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
  accountData,
  accountGetBalance,
  accountFTMtoUSD,
  accountFTMMarketCap,
  transactions,
  transactionsGetList,
  ftmToUsdPrice,
  transactionHashDetails,
  // ftmMarketCap,
  id,
}) => {
  const [marketCap, setMarketCap] = useState('0');
  const [currentId, setCurrentId] = useState('')
  const { t } = useTranslation();

  
  const account = accountData && accountData.list && id && accountData.list[id];

  useEffect(() => {
    if(currentId !== id){

    accountGetBalance(id);
    transactionsGetList(id);
      setCurrentId(id)
     

    accountFTMtoUSD();
    accountFTMMarketCap(value => {
      setMarketCap(value);
    });
      }
        
    const interval = setInterval(() => {
      accountGetBalance(id);
      transactionsGetList(id);
     
    }, 30000);
     
    return () => { clearInterval(interval)};
   
  }, [account, accountFTMMarketCap, 
    accountFTMtoUSD, accountGetBalance, currentId, id, transactions.list, transactionsGetList]);

  
  const [spin, setSpin] = useState(false);

  const loadLatestBalance = useCallback(() => {
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 2000);
    accountGetBalance(id);
    transactionsGetList(id);
  }, [accountGetBalance, id, transactionsGetList]);

  const marketCapValue = 
  parseFloat(marketCap).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return (
    <div>
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

              <p className="card-label">{t("balance")}</p>
              <div className="d-flex align-items-center justify-content-end mb-3">
                <h1 className={classnames('mb-0', styles.ftmNumber)}>
                  {account ? convertFTMValue(parseFloat(account.balance)) : '0'}
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
              <p className="card-label">{t("overview")}</p>
              <div className="mb-4 d-flex justify-content-between">
                <h4 className="m-0 opacity-85">{t("price")}:</h4>
                <p className={classnames('m-0', styles.infoValue)}>
                  $ {parseFloat(ftmToUsdPrice).toFixed(5)}
                </p>
              </div>
              <div className="mb-4 d-flex justify-content-between">
                <h4 className="m-0 opacity-85">{t("marketCap")}:</h4>
                <p className={classnames('m-0', styles.infoValue)}>
                  $ {marketCapValue}
                </p>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            {currentId !== "" && currentId === id && 
            <Activity
              transactions={transactions.list} 
              transactionHashDetails={transactionHashDetails}
              address={id}
            />}
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
