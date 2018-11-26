import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from '../view/pages/home';
import AccountManagement from '../view/pages/account-management';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/account-management" exact component={AccountManagement} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
