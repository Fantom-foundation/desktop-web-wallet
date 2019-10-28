import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '~/view/pages/home';
import AccountManagement from '~/view/pages/account-management';
import CreateAccount from '~/view/pages/create-account/CreateAccount';
import AccountDetails from '~/view/pages/account-details';
import { AccountCreateRouter } from '~/view/pages/create-account/AccountCreateRouter';
import { ConnectedRouter } from "connected-react-router";
import { history } from '~/redux/store';

const Routes = () => (
  // eslint-disable-next-line no-undef
  <ConnectedRouter onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/account-details" exact component={AccountDetails} />
      <Route path="/account-management" exact component={AccountManagement} />

      <Route path="/create" component={AccountCreateRouter} />
      <Route path="/" component={CreateAccount} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
