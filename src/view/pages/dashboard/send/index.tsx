/* eslint-disable jsx-a11y/anchor-is-valid */
import { SendForm } from '../../../components/forms';
import { Card, Row, Col } from 'reactstrap';
import { copyToClipboard } from '~/utility/clipboard';
import { convertFTMValue } from '~/view/general/utilities';
import { useTranslation } from 'react-i18next';
import TokenList from 'src/view/components/tokenList';
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
  accountData: selectAccount(state),
});

const mapDispatchToProps = {
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
}) => {
  // const onClick = useCallback(
  //   event => copyToClipboard(event, account.publicAddress),
  //   [account.publicAddress]
  // );
  const account = accountData.list && id && accountData.list[id];
  const { t } = useTranslation();

  // console.log(accountData, '****acc')

  useEffect(() => {
    // setInterval(() => {
    //   accountGetBalance(id);
    //   transactionsGetList(id);
    // }, 2000);

    const interval = setInterval(() => {
      accountGetBalance(id);
    }, 2000);
    return () => clearInterval(interval);
  }, [accountGetBalance, id]);

  return (
    <div>
      <div className={styles.headWrapper}>
        {/* <h3 className="mb-3 pb-1 opacity-5 font-weight-semi-bold">
          {t('balance')}
        </h3>
        <h2 className="mb-md-5">
          {convertFTMValue(
            parseFloat(account && account.balance ? account.balance : '0')
          )}{' '}
          FTM
        </h2> */}
      </div>
      <Row>
        <Col md={7} lg={8} className="mb-4 pb-2">
          <SendForm data={account} t={t} />
        </Col>
        <Col md={5} lg={4} className="mb-4 pb-2">
          <Card className={classname('h-100', styles.balanceCard)}>
            <p className="card-label">Balances</p>
            <TokenList />
          </Card>
        </Col>
      </Row>

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
