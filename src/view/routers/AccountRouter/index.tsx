import React, { FC } from 'react';
import { Switch, Route } from 'react-router';
import { URLS } from '~/constants/urls';
import Layout from '~/view/components/layout';

const AccountRouter: FC<{}> = () => (
  <Layout>
    <Switch>
      <Route path={URLS.ACCOUNT.BASE(':id')} component={() => <div>ACCOUNT IS HERE</div>} />
    </Switch>
  </Layout>
);

export { AccountRouter };
