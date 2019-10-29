import React, { FC } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccount } from '~/redux/account/selectors';
import { push as historyPush } from 'connected-react-router';
import { AccountCreateCredentialForm } from '~/view/components/create-account/AccountCreateCredentialForm';
import { AccountRestoreProcess } from '~/view/components/create-account/AccountRestoreProcess';

const mapStateToProps = selectAccount;
const mapDispatchToProps = {
  accountCreateSetRestoreCredentials: ACCOUNT_ACTIONS.accountCreateSetRestoreCredentials,
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {};

const AccountRestoreCredentialsUnconnected: FC<IProps> = ({
  push,
  list,
  accountCreateSetRestoreCredentials,
}) => (
  <div id="account-information" className="account-information">
    <AccountRestoreProcess stepNo={1} />
    <AccountCreateCredentialForm
      push={push}
      onSubmit={accountCreateSetRestoreCredentials}
      list={list}
    />
  </div>
);

const AccountRestoreCredentials = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountRestoreCredentialsUnconnected));

export { AccountRestoreCredentials };
