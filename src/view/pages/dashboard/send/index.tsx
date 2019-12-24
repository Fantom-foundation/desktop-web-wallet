/* eslint-disable jsx-a11y/anchor-is-valid */
import { SendForm } from '../../../components/forms';

import { copyToClipboard } from '~/utility/clipboard';
import React, { FC, useEffect,useMemo, useState, useLayoutEffect } from 'react';
import {  RouteComponentProps } from 'react-router';

import { IAccount } from '~/redux/account/types';
import { connect } from 'react-redux';
import { selectTransactions } from '~/redux/transactions/selectors';
import * as ACTIONS from '~/redux/transactions/actions';
import { selectAccount } from '~/redux/account/selectors';




const mapStateToProps = state => ({
  transactions: selectTransactions(state),
  accountData: selectAccount(state),
});

const mapDispatchToProps = {
  transactionsGetList: ACTIONS.transactionsGetList,
  transactionsSetPage: ACTIONS.transactionsSetPage,
};

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }> &
  typeof mapDispatchToProps & {
    account: IAccount,
    list: {},
    id: string
  };

const SendDetails =  ({ 
  match: {
    params: { id },
  },
  accountData:{list},
 }) => {
  // const onClick = useCallback(
  //   event => copyToClipboard(event, account.publicAddress),
  //   [account.publicAddress]
  // );
  const account = useMemo(() => list && id && list[id], [list, id]);


  return (
    <div>
      <h3 className="mb-3 pb-1 opacity-5 font-weight-semi-bold">Balance</h3>
      <h2 className="mb-5">
$
        {account.balance}
        {' '}
FTM
      </h2>
      <SendForm data={account} />
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

export default SendDetailsData ;
