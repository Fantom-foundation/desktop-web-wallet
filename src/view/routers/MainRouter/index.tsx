import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '~/view/pages/home/Home';
import { AccountCreateRouter } from '~/view/pages/account/AccountCreateRouter';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '~/redux/store';
import { URLS } from '~/constants/urls';
import { AccountList } from '~/view/pages/account/AccountList';
import { AccountRouter } from '../AccountRouter';
import { AccountRestoreRouter } from '~/view/pages/account/AccountRestoreRouter';
import { Layout } from '~/view/components/layout/Layout';
import { DashboardLayout } from '~/view/components/layout';
import Dashboard from 'src/view/pages/dashboard';
import Send from '~/view/pages/dashboard/send';
import CreateWallet from '~/view/pages/createWallet';
import Verification from '~/view/pages/verification';

const MainRouter = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <DashboardLayout>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/send" component={Send} />
        </DashboardLayout> */}

        <Layout>
          <Switch>
            <Route path="/create-wallet" component={CreateWallet} />
            <Route path="/verification" component={Verification} />
            <Route path={URLS.ACCOUNT_LIST} component={AccountList} />
            <Route path={URLS.ACCOUNT_CREATE} component={AccountCreateRouter} />
            <Route
              path={URLS.ACCOUNT_RESTORE}
              component={AccountRestoreRouter}
            />
            <Route path={URLS.ACCOUNT.BASE(':id')} component={AccountRouter} />

            <Redirect to="/" />
          </Switch>
        </Layout>
      </Switch>
    </Switch>
  </ConnectedRouter>
);

export { MainRouter };
