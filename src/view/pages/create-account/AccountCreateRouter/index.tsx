import { FC, createElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { ACCOUNT_CREATION_STAGES_COMPONENTS, ACCOUNT_CREATION_STAGES } from '~/redux/account';
import { selectAccountCreate } from '~/redux/account/selectors';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const mapStateToProps = selectAccountCreate;
const mapDispatchToProps = {
  accountCreateClear: ACCOUNT_ACTIONS.accountCreateClear,
};

type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const AccountCreateRouterUnconnected: FC<IProps> = ({ stage, accountCreateClear }) => {
  useEffect(
    () => () => {
      accountCreateClear();
    },
    [accountCreateClear]
  );

  return createElement(
    (stage && ACCOUNT_CREATION_STAGES_COMPONENTS[stage]) ||
      ACCOUNT_CREATION_STAGES_COMPONENTS[ACCOUNT_CREATION_STAGES.CREDENTIALS]
  );
};

const AccountCreateRouter = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCreateRouterUnconnected);

export { AccountCreateRouter };
