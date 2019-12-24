import React, { FC, useMemo, useEffect } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { URLS } from '~/constants/urls';
import { selectAccount } from '~/redux/account/selectors';
import { push as historyPush, push } from 'connected-react-router';
import { AccountDetails } from '~/view/pages/account/AccountDetails';
import { connect } from 'react-redux';
import { DashboardLayout } from '~/view/components/layout';
import Send from '~/view/pages/dashboard/send';
import Recieve from '~/view/pages/dashboard/receive';
import Stake from '~/view/pages/dashboard/stake';

const mapStateToProps = selectAccount;
const mapDispatchToProps = {
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }> &
  typeof mapDispatchToProps & {};

const AccountRouterUnconnected: FC<IProps> = ({
  list,
  match: {
    params: { id },
  },
}) => {
  const account = useMemo(() => list && id && list[id], [list, id]);

  useEffect(() => {
    if (!account) push(URLS.ACCOUNT_LIST);
  }, [account]);

  if (!account) return null;

  return (
    <>
      <Switch>
        <DashboardLayout account={account}>
          <Route
            exact
            path={URLS.ACCOUNT.BASE(':id')}
            component={() => <AccountDetails account={account} />}
          />
          <Route
            exact
            path={URLS.ACCOUNT.BASE(':id/send')}
            component={() => <Send account={account} />}
          />
          <Route
            exact
            path={URLS.ACCOUNT.BASE(':id/receive')}
            component={() => <Recieve account={account} />}
          />
          <Route
            exact
            path={URLS.ACCOUNT.BASE(':id/stake')}
            component={() => <Stake />}
          />
        </DashboardLayout>
        {/* <Route path={URLS.ACCOUNT.BASE(':id')} component={() => null} /> */}
      </Switch>

      {/* <AccountDetails account={account} /> */}
    </>
  );
};

const AccountRouter = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountRouterUnconnected);

export { AccountRouter };
