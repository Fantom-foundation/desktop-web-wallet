import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from '../view/pages/home';
import AccountManagement from '../view/pages/account-management';
import CreateAccount from '../view/pages/create-account';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/account-management" exact component={AccountManagement} />
      {/* <Route path="/account-information" exact component={AccountInformation} /> */}
      <Route path="/" component={CreateAccount} />
      {/* <Route path="/confirm" exact component={Confirm} /> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;
