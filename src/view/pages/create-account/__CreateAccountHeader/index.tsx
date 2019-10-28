import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CreateAccountSection from '~/view/pages/create-account/__CreateAccountSection';
import AccountInformation from '~/view/pages/create-account/__AccountCreateInformation';
import AccountCreateConfirm from '~/view/pages/create-account/__AccountCreateConfirmation';
import EnterMnemonics from '~/view/pages/enter-mnemonics';
import { AccountCreateCredentials } from '../AccountCreateCredentials';

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
      path="/create-account-new"
      exact
      component={AccountCreateCredentials}
    />
    
    <Route
      path="/restore-account"
      exact
      render={() => <CreateAccountSection formData={props.formData} />}
    />

    <Route path="/confirm-restore" exact render={() => <EnterMnemonics {...props} />} />

    <Route path="/confirm" exact component={AccountCreateConfirm} />
        
    <Redirect to="/" />
  </Switch>
);

export { CreateAccountHeader };

