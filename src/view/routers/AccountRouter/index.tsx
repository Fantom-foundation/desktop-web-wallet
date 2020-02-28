import React, { FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { URLS } from '~/constants/urls';
import { push as historyPush } from 'connected-react-router';
import { AccountDetails } from '~/view/pages/account/AccountDetails';
import { connect } from 'react-redux';
import { DashboardLayout } from '~/view/components/layout';
import Send from '~/view/pages/dashboard/send';
import Recieve from '~/view/pages/dashboard/receive';
import Stake from '~/view/pages/dashboard/stake';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const mapStateToProps = () => {};
const mapDispatchToProps = {
  push: historyPush,
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
};

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }> &
  typeof mapDispatchToProps;

const AccountRouterUnconnected: FC<IProps> = ({
  match: {
    params: { id },
  },
}) => {
  

  return (
    <>
      <Switch>
        <DashboardLayout address={id}>
          <Route
            exact
            path={URLS.ACCOUNT.BASE(':id')}
            component={() => <AccountDetails id={id} />}
          />
          <Route exact path={URLS.ACCOUNT.BASE(':id/send')} component={Send} />
          <Route
            exact
            path={URLS.ACCOUNT.BASE(':id/receive')}
            component={Recieve}
          />
          <Route
            exact
            path={URLS.ACCOUNT.BASE(':id/stake')}
            component={() => <Stake id={id} />}
          />
        </DashboardLayout>
      </Switch>

    </>
  );
};

const AccountRouter = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountRouterUnconnected);

export { AccountRouter };
