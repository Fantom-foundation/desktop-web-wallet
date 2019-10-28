import { FC, createElement } from 'react';
import { connect } from 'react-redux';
import { ACCOUNT_CREATION_STAGES_COMPONENTS, ACCOUNT_CREATION_STAGES } from '~/redux/account';
import { selectAccountCreate } from '~/redux/account/selectors';

const mapStateToProps = selectAccountCreate;

type IProps = ReturnType<typeof mapStateToProps> & {};

const AccountCreateRouterUnconnected: FC<IProps> = ({ stage }) =>
  createElement(
    (stage && ACCOUNT_CREATION_STAGES_COMPONENTS[stage]) ||
      ACCOUNT_CREATION_STAGES_COMPONENTS[ACCOUNT_CREATION_STAGES.CREDENTIALS]
  );

const AccountCreateRouter = connect(mapStateToProps)(AccountCreateRouterUnconnected);

export { AccountCreateRouter };
