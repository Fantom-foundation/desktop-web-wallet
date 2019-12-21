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
import Receive from '~/view/pages/dashboard/receive';
import Stake from '~/view/pages/dashboard/stake';
import { AccountCreateCredentialForm } from '~/view/pages/createWallet';
import { AccountCreateInfo } from '~/view/pages/createWallet/mnemonicPhrase';
import {AccountCreateCredentials} from '~/view/pages/account/AccountCreateCredentials'


const MainRouter = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <DashboardLayout>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/send" component={Send} />
          <Route path="/dashboard/receive" component={Receive} />
          <Route path="/dashboard/stake" component={Stake} />
        </DashboardLayout> */}

        <Layout>
          <Switch>
            <Route
              path="/create-wallet"
              component={AccountCreateCredentialForm}
            />
            {/* <Route path="/create-wallet-mnemonic" component={MnemonicPhrase} /> */}
            <Route path={URLS.ACCOUNT_CREATE} component={AccountCreateCredentials} />
            {/* <Route path={URLS.ACCOUNT_LIST} component={AccountList} />
            <Route path="/create-wallet-mnemonic" component={AccountCreateInfo} />
            {/* <Route path={URLS.ACCOUNT_CREATE} component={CreateWallet} /> */}
            {/* <Route path={URLS.ACCOUNT_LIST} component={AccountList} />
            <Route path={URLS.ACCOUNT_CREATE} component={AccountCreateRouter} />
            <Route
              path={URLS.ACCOUNT_RESTORE}
              component={AccountRestoreRouter}
            />
            <Route path={URLS.ACCOUNT.BASE(':id')} component={AccountRouter} />

            <Redirect to="/" /> */}
          </Switch>
        </Layout>
      </Switch>
    </Switch>
  </ConnectedRouter>
);

export { MainRouter };
