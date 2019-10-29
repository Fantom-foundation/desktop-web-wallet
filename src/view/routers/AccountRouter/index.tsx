import React, { FC, useMemo, useEffect } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { URLS } from '~/constants/urls';
import { selectAccount } from '~/redux/account/selectors';
import { push as historyPush, push } from 'connected-react-router';
import { AccountDetails } from '~/view/pages/account-details/AccountDetails';
import { connect } from 'react-redux';

const mapStateToProps = selectAccount;
const mapDispatchToProps = {
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }> &
  typeof mapDispatchToProps & {};

const AccountRouterUnconnected: FC<IProps> = ({
  list,
  match: {
    params: { id },
  },
}) => {
  const account = useMemo(() => list && id && list[id], [list, id]);

  useEffect(() => {
    if (!account) push(URLS.ACCOUNT_LIST);
  }, [account]);

  if (!account) return null;

  return (
    <>
      <Switch>
        <Route path={URLS.ACCOUNT.BASE(':id')} component={() => null} />
      </Switch>

      <AccountDetails account={account} />
    </>
  );
};

const AccountRouter = connect(mapStateToProps, mapDispatchToProps)(AccountRouterUnconnected);

export { AccountRouter };
