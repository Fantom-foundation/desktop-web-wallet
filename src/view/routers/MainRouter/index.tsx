import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { AccountCreateRouter } from '~/view/pages/account/AccountCreateRouter';
import { URLS } from '~/constants/urls';
import { AccountList } from '~/view/pages/account/AccountList';
import { AccountRouter } from '../AccountRouter';
import { AccountCreateSuccess } from '~/view/pages/account/AccountCreateSuccess';
import { AccountRestoreRouter } from '~/view/pages/account/AccountRestoreRouter';
import { AccountRestoreCredentials } from '~/view/pages/account/AccountRestoreCredentials';

import AccessWallet from '~/view/pages/accessWallet';

const MainRouter = () => {
  
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={AccountList} />
        <Route exact path={URLS.ACCOUNT_RESTORE} component={AccountRestoreRouter} />
        <Route exact path='/account/restore/credentials' component={AccountRestoreCredentials} />

        <Route exact path="/access-wallet" component={AccessWallet} />

        <Route
          exact
          path={URLS.ACCOUNT_CREATE}
          component={AccountCreateRouter}
        />
        <Route exact path="/account/success" component={AccountCreateSuccess} />
        <Route exact path={URLS.ACCOUNT_LIST} component={AccountList} />

        <Route
          exact
          path={URLS.ACCOUNT_RESTORE}
          component={AccountRestoreRouter}
        />
        <Route path={URLS.ACCOUNT.BASE(':id')} component={AccountRouter} />
        <Route component={() => { return <h1>testt</h1>}} />

      </Switch>
    </HashRouter>
  );
};

export { MainRouter };
