import React, { FC, useEffect } from 'react';
import { IAccount } from '~/redux/account/types';
import { connect } from 'react-redux';
import { selectTransactionsList } from '~/redux/transactions/selectors';
import * as ACTIONS from '~/redux/transactions/actions';

const mapStateToProps = state => ({
  list: selectTransactionsList(state),
});

const mapDispatchToProps = {
  transactionsGetList: ACTIONS.transactionsGetList,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    account: IAccount;
  };

const AccountTransactionsListUnconnected: FC<IProps> = ({
  account,
  transactionsGetList,
}) => {
  useEffect(() => {
    transactionsGetList(account.publicAddress);
  }, [account.publicAddress]);

  return <div>{account.publicAddress}</div>;
};

const AccountTransactionsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTransactionsListUnconnected);

export { AccountTransactionsList };
