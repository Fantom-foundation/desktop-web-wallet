import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '~/view/pages/home/Home';
import { AccountCreateRouter } from '~/view/pages/account/AccountCreateRouter';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '~/redux/store';
import { URLS } from '~/constants/urls';
import { AccountList } from '~/view/pages/account-list/AccountList';
import { AccountRouter } from '../AccountRouter';
import { AccountRestoreRouter } from '~/view/pages/account/AccountRestoreRouter';
import { Layout } from '~/view/components/layout/Layout';

const MainRouter = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Switch>
        <Route path="/" exact component={Home} />

        <Layout>
          <Switch>
            <Route path={URLS.ACCOUNT_LIST} component={AccountList} />
            <Route path={URLS.ACCOUNT_CREATE} component={AccountCreateRouter} />
            <Route path={URLS.ACCOUNT_RESTORE} component={AccountRestoreRouter} />
            <Route path={URLS.ACCOUNT.BASE(':id')} component={AccountRouter} />

            <Redirect to="/" />
          </Switch>
        </Layout>
      </Switch>
    </Switch>
  </ConnectedRouter>
);

export { MainRouter };
