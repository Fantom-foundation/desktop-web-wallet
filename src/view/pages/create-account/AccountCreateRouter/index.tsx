import { FC, createElement } from 'react';
import { connect } from 'react-redux';
import { ACCOUNT_CREATION_STAGES_COMPONENTS, ACCOUNT_CREATION_STAGES } from '~/redux/account';

const mapStateToProps = state => ({
  stage: state.create.stage,
});

type IProps = ReturnType<typeof mapStateToProps> & {};

const AccountCreateRouterUnconnected: FC<IProps> = ({ stage }) =>
  createElement(
    (stage && ACCOUNT_CREATION_STAGES_COMPONENTS[stage]) ||
      ACCOUNT_CREATION_STAGES_COMPONENTS[ACCOUNT_CREATION_STAGES.CREDENTIALS]
  );

const AccountCreateRouter = connect()(AccountCreateRouterUnconnected);

export { AccountCreateRouter };
