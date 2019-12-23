import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AccountCreateRouter } from '~/view/pages/account/AccountCreateRouter';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '~/redux/store';
import { URLS } from '~/constants/urls';
import { AccountList } from '~/view/pages/account/AccountList';
import { AccountRouter } from '../AccountRouter';
import { AccountRestoreRouter } from '~/view/pages/account/AccountRestoreRouter';
import {AccountCreateSuccess} from '~/view/pages/account/AccountCreateSuccess'

const MainRouter = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Switch>
          <Route exact path="/" component={AccountList} />
          <Route
            exact
            path={URLS.ACCOUNT_CREATE}
            component={AccountCreateRouter}
          />
          <Route
            exact
            path='/account/success'
            component={AccountCreateSuccess}
          />
          <Route exact path={URLS.ACCOUNT_LIST} component={AccountList} />

          <Route
            exact
            path={URLS.ACCOUNT_RESTORE}
            component={AccountRestoreRouter}
          />
          <Route path={URLS.ACCOUNT.BASE(':id')} component={AccountRouter} />
        </Switch>
      </Switch>
    </ConnectedRouter>
  );
};

export { MainRouter };
