import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '~/view/pages/home';
import AccountManagement from '~/view/pages/account-management';
import CreateAccount from '~/view/pages/create-account/__CreateAccount';
import AccountDetails from '~/view/pages/account-details';
import { AccountCreateRouter } from '~/view/pages/create-account/AccountCreateRouter';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '~/redux/store';
import { URLS } from '~/constants/urls';
import { AccountList } from '~/view/pages/account-list/AccountList';
import { AccountRouter } from '../AccountRouter';

const MainRouter = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path={URLS.ACCOUNT_LIST} component={AccountList} />
      <Route path={URLS.ACCOUNT_CREATE} component={AccountCreateRouter} />
      <Route path={URLS.ACCOUNT.BASE(':id')} component={AccountRouter} />

      <Route path="/account-details" exact component={AccountDetails} />
      <Route path="/account-management" exact component={AccountManagement} />

      <Route path="/" component={CreateAccount} />

      <Redirect to="/" />
    </Switch>
  </ConnectedRouter>
);

export { MainRouter };
