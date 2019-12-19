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
import { AccountCreateCredentialForm } from '~/view/pages/createWallet';
import MnemonicPhrase from '~/view/pages/createWallet/mnemonicPhrase';

const MainRouter = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Switch>
        <Route path="/" exact component={Home} />
        <DashboardLayout>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/send" component={Send} />
        </DashboardLayout>

        {/* <Layout>
          <Switch>
            <Route
              path="/create-wallet"
              component={AccountCreateCredentialForm}
            />
            <Route path="/create-wallet-mnemonic" component={MnemonicPhrase} /> */}
        {/* <Route path={URLS.ACCOUNT_CREATE} component={CreateWallet} /> */}
        {/* <Route path={URLS.ACCOUNT_LIST} component={AccountList} />
            <Route path={URLS.ACCOUNT_CREATE} component={AccountCreateRouter} />
            <Route
              path={URLS.ACCOUNT_RESTORE}
              component={AccountRestoreRouter}
            />
            <Route path={URLS.ACCOUNT.BASE(':id')} component={AccountRouter} />

            <Redirect to="/" />
          </Switch>
        </Layout> */}
      </Switch>
    </Switch>
  </ConnectedRouter>
);

export { MainRouter };
