import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CreateAccountSection from '~/view/pages/create-account/CreateAccountSection';
import AccountInformation from '~/view/pages/account-information';
import Confirm from '~/view/pages/confirm';
import EnterMnemonics from '~/view/pages/enter-mnemonics';

interface Props {
  onUpdate: (key: any, value: any) => void;
  getRadioIconData: (identiconsId: string) => void;
  onRefresh: () => void;
  data: any;
  formData: any;
};

const CreateAccountHeader: FC<Props> = props => (
  <Switch>
    <Route
      path="/account-information"
      exact
      render={() => <AccountInformation {...props.data} />}
    />

    <Route
      path="/create-account"
      exact
      render={() => <CreateAccountSection formData={props.formData} />}
    />
    
    <Route
      path="/restore-account"
      exact
      render={() => <CreateAccountSection formData={props.formData} />}
    />

    <Route path="/confirm-restore" exact render={() => <EnterMnemonics {...props} />} />

    <Route path="/confirm" exact component={Confirm} />
    
    <Route path="/confirm" exact component={Confirm} />
    
    <Redirect to="/" />
  </Switch>
);

export { CreateAccountHeader };

