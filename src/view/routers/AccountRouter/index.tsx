import React, { FC, useMemo, useEffect } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { URLS } from '~/constants/urls';
import { selectAccount } from '~/redux/account/selectors';
import { push as historyPush, push } from 'connected-react-router';
import { AccountDetails } from '~/view/pages/account/AccountDetails';
import FLend from '~/view/pages/fLend';
import FlendBorrow from '~/view/pages/flendBorrow';
import { connect } from 'react-redux';
import { DashboardLayout } from '~/view/components/layout';
import Send from '~/view/pages/dashboard/send';
import Recieve from '~/view/pages/dashboard/receive';
import Stake from '~/view/pages/dashboard/stake';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import * as ACTIONS from '~/redux/transactions/actions';

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
  accountGetBalance,
}) => {
  // const account = useMemo(() => list && id && list[id], [list, id]);

  // useEffect(() => {
  //   if (!account) {
  //     push(URLS.ACCOUNT_LIST);
  //     // accountGetBalance(account.publicAddress);
  //   }
  // }, [account]);
  // console.log(id, '*****idid');

  // useEffect(() => {
  //   transactionsSetPage(0);
  // }, [account.publicAddress, transactionsSetPage]);

  // useEffect(() => {
  //   transactionsGetList(account.publicAddress);
  // }, [account.publicAddress,  transactionsGetList]);

  // if (!account) return null;

  return (
    <>
      <Switch>
        <DashboardLayout address={id}>
          <Route
            exact
            path={URLS.ACCOUNT.BASE(':id')}
            component={() => <AccountDetails id={id} />}
          />
          <Route
            exact
            path={URLS.ACCOUNT.BASE(':id/f-lend')}
            component={FLend}
          />
          <Route
            exact
            path={URLS.ACCOUNT.BASE(':id/f-lend-borrow')}
            component={FlendBorrow}
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
