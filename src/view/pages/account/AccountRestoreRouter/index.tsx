import { FC, createElement, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  ACCOUNT_CREATION_STAGES,
  ACCOUNT_RESTORE_STAGES_COMPONENTS,
} from '~/redux/account';
import { selectAccountCreate } from '~/redux/account/selectors';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const mapStateToProps = selectAccountCreate;
const mapDispatchToProps = {
  accountCreateClear: ACCOUNT_ACTIONS.accountCreateClear,
};

type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const AccountRestoreRouterUnconnected: FC<IProps> = ({ stage, accountCreateClear }) => {
  useEffect(
    () => () => {
      accountCreateClear();
    },
    [accountCreateClear]
  );

  return createElement(
    (stage && ACCOUNT_RESTORE_STAGES_COMPONENTS[stage]) ||
      ACCOUNT_RESTORE_STAGES_COMPONENTS[ACCOUNT_CREATION_STAGES.CREDENTIALS]
  );
};

const AccountRestoreRouter = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountRestoreRouterUnconnected);

export { AccountRestoreRouter };
