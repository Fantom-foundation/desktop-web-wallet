/* eslint-disable jsx-a11y/anchor-is-valid */
import { SendForm } from '../../../components/forms';
import { Card } from 'reactstrap';
import { copyToClipboard } from '~/utility/clipboard';
import { convertFTMValue } from '~/view/general/utilities';
import React, {
  FC,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
} from 'react';
import { RouteComponentProps } from 'react-router';
import {
  CopyIcon,
  CheckCircleIcon,
  ErrorCircleIcon,
} from 'src/view/components/svgIcons';
import classname from 'classnames';
import { IAccount } from '~/redux/account/types';
import { connect } from 'react-redux';
import { selectTransactions } from '~/redux/transactions/selectors';
import * as ACTIONS from '~/redux/transactions/actions';
import {
  selectAccount,
  selectAccountTransfer,
} from '~/redux/account/selectors';
import styles from './styles.module.scss';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const mapStateToProps = state => ({
  transactions: selectTransactions(state),
  accountData: selectAccount(state),
});

const mapDispatchToProps = {
  transactionsGetList: ACTIONS.transactionsGetList,
  transactionsSetPage: ACTIONS.transactionsSetPage,
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
};

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }> &
  typeof mapDispatchToProps & {
    account: IAccount;
    list: {};
    id: string;
  };

const SendDetails = ({
  match: {
    params: { id },
  },
  accountGetBalance,
  accountData,
  transactionsGetList,
  transactions,
}) => {
  // const onClick = useCallback(
  //   event => copyToClipboard(event, account.publicAddress),
  //   [account.publicAddress]
  // );
  const account = accountData.list && id && accountData.list[id];

  // console.log(accountData, '****acc')
  let hash = '';
  if (transactions && transactions.list && transactions.list.length > 0) {
    hash = transactions.list[0].hash;
  }
  useEffect(() => {
    setInterval(() => {
      accountGetBalance(id);
    }, 5000);
    transactionsGetList(id);
  }, [accountGetBalance, id, transactionsGetList]);

  return (
    <div>
      <div className={styles.headWrapper}>
        <h3 className="mb-3 pb-1 opacity-5 font-weight-semi-bold">Balance</h3>
        <h2 className="mb-md-5">
          {convertFTMValue(parseFloat(account.balance))}
          {' '}
FTM
        </h2>
      </div>
      <SendForm data={account} transactionHash={hash || ''} />
      {/* <div>
        <Card className={classname(styles.card, 'mb-5 mt-5')}>
          <h2>Transaction sent!</h2>
          <div className={classname(styles.iconGap, styles.hash)}>
            <a href="#">{account.publicAddress}</a>
            <button className={styles.copyBtn} type="button" onClick={onClick}>
              <CopyIcon />
            </button>
          </div>
          <div>
            <CheckCircleIcon />
          </div>
        </Card>
      </div>
      <div>
        <Card className={classname(styles.card, 'mb-5')}>
          <h2 className={styles.iconGap}>
            Something went wrong.
            <br />
            Please try again.
          </h2>
          <div>
            <ErrorCircleIcon />
          </div>
        </Card>
      </div> */}
    </div>
  );
};

const SendDetailsData = connect(
  mapStateToProps,
  mapDispatchToProps
)(SendDetails);

export default SendDetailsData;
