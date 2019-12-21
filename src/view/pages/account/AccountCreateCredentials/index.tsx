import React, { FC } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccount } from '~/redux/account/selectors';
import { push as historyPush } from 'connected-react-router';
import { AccountCreateCredentialForm } from '~/view/components/account/AccountCreateCredentialForm';
import { AccountCreateProcess } from '~/view/components/account/AccountCreateProccess';
import { Layout } from '~/view/components/layout/Layout';

const mapStateToProps = selectAccount;
const mapDispatchToProps = {
  accountCreateSetCredentials: ACCOUNT_ACTIONS.accountCreateSetCredentials,
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {};

const AccountCreateCredentialsUnconnected: FC<IProps> = ({
  push,
  list,
  accountCreateSetCredentials,
}) => (
  <Layout>
    <div id="account-information" className="account-information">
      {/* <AccountCreateProcess stepNo={1} /> */}
      <AccountCreateCredentialForm
        push={push}
        onSubmit={accountCreateSetCredentials}
        list={list}
      />
    </div>
  </Layout>
);

const AccountCreateCredentials = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountCreateCredentialsUnconnected));

export { AccountCreateCredentials };
