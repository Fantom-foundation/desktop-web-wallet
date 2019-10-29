import React, { FC } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { push as historyPush } from 'connected-react-router';
import { AccountCreateCredentialForm } from '~/view/components/create-account/AccountCreateCredentialForm';
import AccountProcess from '~/view/components/create-account/AccountProccess';
import { Layout } from '~/view/components/layout/Layout';

const mapStateToProps = selectAccountCreate;
const mapDispatchToProps = {
  accountCreateSetCredentials: ACCOUNT_ACTIONS.accountCreateSetCredentials,
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {};

const AccountCreateCredentialsUnconnected: FC<IProps> = ({ push, accountCreateSetCredentials }) => (
  <div id="account-information" className="account-information">
    <Layout>
      <AccountProcess restoreAccount={false} stepNo={1} />
      <AccountCreateCredentialForm push={push} onSubmit={accountCreateSetCredentials} />
    </Layout>
  </div>
);

const AccountCreateCredentials = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountCreateCredentialsUnconnected));

export { AccountCreateCredentials };
