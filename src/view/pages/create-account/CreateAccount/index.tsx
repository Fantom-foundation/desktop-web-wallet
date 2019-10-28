import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import _ from 'lodash';
import AccountProcess from '~/view/components/account-process';
import Layout from '~/view/components/layout';
import * as ACCOUNT_IN_PROGRESS_ACTIONS from '~/redux/accountInfo/action';
import * as GET_BALANCE_ACTION from '~/redux/getBalance/action';
import ValidationMethods from '~/validations/userInputMethods';

import { CONFIRMATION_PHASE } from '~/redux/constants';
import { CreateAccountHeader } from '../CreateAccountHeader';

const validationMethods = new ValidationMethods();

const mapStateToProps = state => ({
  accountName: state.accountInfo.accountName,
  password: state.accountInfo.password,
  selectedIcon: state.accountInfo.selectedIcon,
  stepNo: state.accountInfo.stepNo,
  accountsList: state.accounts.accountsList,
});

const mapDispatchToProps = {
  accountInfoCreateAccount: ACCOUNT_IN_PROGRESS_ACTIONS.accountInfoCreateAccount,
  incrementStepNo: ACCOUNT_IN_PROGRESS_ACTIONS.incrementStepNo,
  getFantomBalance: GET_BALANCE_ACTION.getFantomBalance,
};

type State = {
  accountName: string;
  password: string;
  reEnteredPassword: string;
  date: number;
  animateRefreshIcon: boolean;
  identiconsId: string;
  selectedIcon: string;
  error: boolean;
  containNumber: boolean;
  containCapitalLetter: boolean;
  hasLengthGreaterThanEight: boolean;
  nextButtonFunction: string;
  backButtonFunction: string;
  selectIconError: boolean;
  revealSecret: boolean;
  confirmationPhrase: string;
  isAccountNameExists: boolean;
  selectedIconError: boolean;
};

type Props = RouteComponentProps &
  typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps> & {};

class CreateAccount extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      accountName: props.accountName || '',
      password: props.password || '',
      reEnteredPassword: '',
      date: new Date().getTime(),
      animateRefreshIcon: false,
      identiconsId: props.selectedIcon || '',
      selectedIcon: props.selectedIcon || '',
      error: false,
      containNumber: false,
      containCapitalLetter: false,
      hasLengthGreaterThanEight: false,
      nextButtonFunction: '',
      backButtonFunction: '',
      selectIconError: false,
      revealSecret: false,
      confirmationPhrase: '',
      isAccountNameExists: false,
      selectedIconError: false,
    };

    this.createNewAccount = this.createNewAccount.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.getRadioIconData = this.getRadioIconData.bind(this);
    this.goToNextScreen = this.goToNextScreen.bind(this);
    this.goToPreviousScreen = this.goToPreviousScreen.bind(this);
    this.goToAccountInfoScreen = this.goToAccountInfoScreen.bind(this);
    this.revealSecret = this.revealSecret.bind(this);
    this.goToAccountRestoreScreen = this.goToAccountRestoreScreen.bind(this);
  }

  componentDidMount() {
    const { password } = this.state;
    this.isValidPassword('password', password);
    this.setStepNoWithRouting();
  }

  /**
   * This method will update the value of the given key
   */
  onUpdate(key: keyof State, value: State[keyof State]) {
    this.setState(
      state => ({
        ...state,
        ...(key === 'selectedIcon' ? { selectIconError: false } : {}),
        [key]: value,
      }),
      () => {
        this.disableNextButton();
      }
    );

    if (key === 'password' || key === 'reEnteredPassword') {
      this.isValidPassword(key, value);
    }
  }

  /**
   * This method will set the stepNo according to the current route
   */
  setStepNoWithRouting() {
    const { location, incrementStepNo } = this.props;
    const { pathname } = location;
    let stepNo = 1;
    if (pathname === '/confirm') {
      stepNo = 3;
    } else if (pathname === '/account-information') {
      stepNo = 2;
    } else if (pathname === '/confirm-restore') {
      stepNo = 2;
    } else if (pathname === '/restore-account') {
      stepNo = 1;
    }

    incrementStepNo({ stepNo });
  }

  /**
   * This method will set the funciton calls on back and
   * next button according to the current route
   */
  setFunctionCalls() {
    const { location } = this.props;
    const { pathname } = location;
    let nextButtonFunction = this.createNewAccount;
    let backButtonFunction = () => {};

    if (pathname === '/confirm') {
      nextButtonFunction = backButtonFunction;
      backButtonFunction = this.goToAccountInfoScreen;
    } else if (pathname === '/account-information') {
      nextButtonFunction = this.goToNextScreen;
      backButtonFunction = this.goToPreviousScreen;
    } else if (pathname === '/confirm-restore') {
      nextButtonFunction = this.goToNextScreen;
      backButtonFunction = this.goToAccountRestoreScreen;
    }

    return {
      nextButtonFunction,
      backButtonFunction,
    };
  }

  /**
   * This method will refresh all the Icons
   */
  onRefresh = () => {
    const newDate = new Date().getTime();
    this.setState({ date: newDate });
  };

  /**
   * This method will return the initial account information
   */
  getInitialAccountInfo() {
    const { accountName, password, selectedIcon } = this.props;
    return { accountName, password, selectedIcon };
  }

  /**
   * @param {Selected Icon ID} identiconsId
   * This method will set the icon Id
   */
  getRadioIconData(identiconsId) {
    this.setState(
      {
        identiconsId,
      },
      () => {
        this.disableNextButton();
      }
    );
  }

  /**
   * This method will unblur the blurred part which hides the mnemonics
   */
  revealSecret() {
    this.setState({
      revealSecret: true,
    });
  }

  /**
   * This method will move to the Confirm screen and set the step no
   */
  goToNextScreen() {
    const { incrementStepNo, history } = this.props;
    incrementStepNo({ stepNo: 3 });
    history.push('/confirm');
  }

  /**
   * This method will move to the Account information screen and set the step no
   */
  goToAccountInfoScreen() {
    const { incrementStepNo, history, location } = this.props;
    const { pathname } = location;

    if (pathname === '/restore-account') {
      incrementStepNo({ stepNo: 2 });
      history.push('/confirm-restore');
    } else {
      incrementStepNo({ stepNo: 2 });
      this.setState({
        revealSecret: false,
        confirmationPhrase: '',
      });
      history.push('/account-information');
    }
  }

  goToAccountRestoreScreen() {
    const { history, incrementStepNo } = this.props;
    const { identiconsId } = this.state;
    incrementStepNo({ stepNo: 1 });
    this.setState({
      isAccountNameExists: false,
      selectedIcon: identiconsId,
    });
    history.push('/restore-account');
  }

  /**
   * This method will move to the previous create account screen and set the step no
   */
  goToPreviousScreen() {
    const { incrementStepNo, history } = this.props;
    const { identiconsId } = this.state;
    incrementStepNo({ stepNo: 1 });
    this.setState({
      selectedIcon: identiconsId,
    });
    history.push('/create-account');
  }

  /**
   * This method will create the new account and set the state in the reducers
   */
  createNewAccount() {
    const { accountInfoCreateAccount, incrementStepNo, location, history, accountsList } = this.props;
    const { pathname } = location;
    const { accountName, password, reEnteredPassword, identiconsId } = this.state;

    const data = {
      accountName,
      password,
      reEnteredPassword,
      selectedIcon: identiconsId,
    };

    const isNameExists = _.findIndex(
      accountsList,
      accountInfo => accountInfo.accountName === accountName
    );

    if (isNameExists === -1) {
      accountInfoCreateAccount(data);

      if (pathname === '/restore-account') {
        incrementStepNo({ stepNo: 2 });
        history.push('/confirm-restore');
      } else {
        incrementStepNo({ stepNo: 2 });
        this.setState({
          revealSecret: false,
          confirmationPhrase: '',
          isAccountNameExists: false,
        });
        history.push('/account-information');
      }
    } else {
      this.setState({
        isAccountNameExists: true,
      });
    }
  }

  /**
   * @param {Key name} key
   * @param {Value} value
   * This method check whether password is correct or not
   * and both the passwords are same
   */
  isValidPassword(key, value) {
    const { password, reEnteredPassword } = this.state;
    const passwordVal = key === 'password' ? value : password;
    const rePasswordVal = key === 'reEnteredPassword' ? value : reEnteredPassword;
    const isValid = validationMethods.isPasswordCorrect('password', passwordVal);
    if (rePasswordVal && rePasswordVal !== '') {
      isValid.error = passwordVal !== rePasswordVal;
    }
    this.setState(isValid);
  }

  /**
   * This method will check the status of the next button on the step one
   */
  disableNextButtonOnStepOne() {
    const {
      accountName,
      password,
      reEnteredPassword,
      identiconsId,
      selectedIcon,
      containNumber,
      containCapitalLetter,
      hasLengthGreaterThanEight,
      error,
    } = this.state;

    const data = {
      accountName,
      password,
      reEnteredPassword,
      identiconsId,
      containNumber,
      containCapitalLetter,
      hasLengthGreaterThanEight,
    };

    if (selectedIcon) {
      data.identiconsId = selectedIcon;
    }

    const isAnyFieldEmpty = _.includes(data, '');
    const isAnyFieldUndefined = _.includes(data, undefined);
    const isPasswordIncorrect = _.includes(data, false);

    return isAnyFieldEmpty || isPasswordIncorrect || isAnyFieldUndefined || error;
  }

  /**
   * This method will check the status of the next button on the step two
   */
  disableNextButtonOnStepTwo() {
    const { confirmationPhrase } = this.state;
    const data = {
      // revealSecret,
      confirmationPhrase,
    };

    const isAnyFieldEmpty = _.includes(data, '');
    const isAnyFieldUndefined = _.includes(data, undefined);
    const isPasswordIncorrect = _.includes(data, false);

    return (
      isAnyFieldEmpty ||
      isPasswordIncorrect ||
      isAnyFieldUndefined ||
      confirmationPhrase !== CONFIRMATION_PHASE
    );

    // if (
    //   !isAnyFieldEmpty &&
    //   !isPasswordIncorrect &&
    //   !isAnyFieldUndefined &&
    //   confirmationPhrase === CONFIRMATION_PHASE
    // ) {
    //   return false;
    // }

    // return true;
  }

  /**
   * This method will return the status of the next button
   */
  disableNextButton() {
    const { stepNo } = this.props;

    if (stepNo === 1) {
      return this.disableNextButtonOnStepOne();
    }

    if (stepNo === 2) {
      return this.disableNextButtonOnStepTwo();
    }

    if (stepNo === 3) {
      return true;
    }

    return false;
  }

  nextForIdenticonIcon() {
    const { stepNo } = this.props;
    if (stepNo === 1) {
      const { selectedIcon, accountName, password, reEnteredPassword } = this.state;
      if (accountName !== '' && password !== '' && reEnteredPassword !== '' && !selectedIcon) {
        this.setState({ selectIconError: true });
      }
    }
    return true;
  }

  isAllowedPath() {
    const { stepNo = 0, location } = this.props;
    const { pathname } = location || {};

    if (pathname === '/create-account' || pathname === '/restore-account') {
      return true;
    }

    if (pathname === '/account-information') {
      return stepNo > 1;
    }
    
    if (pathname === '/confirm-restore') {
      return stepNo === 2;
    }

    if (pathname === '/confirm') {
      return stepNo === 3;
    }

    if (pathname === '/create-account-new') {
      return stepNo > 1;
    }

    return undefined;
  }

  render() {
    const isAllowedPath = this.isAllowedPath();
    if (isAllowedPath === false) {
      return <Redirect to="/create-account" />;
    }
    if (isAllowedPath === undefined) {
      return <Redirect to="/" />;
    }
    const { stepNo = 0, location } = this.props;
    const {
      revealSecret,
      confirmationPhrase,
      accountName,
      password,
      reEnteredPassword,
      selectedIcon,
      date,
      animateRefreshIcon,
      identiconsId,
      error,
      containNumber,
      containCapitalLetter,
      hasLengthGreaterThanEight,
      isAccountNameExists,
      selectIconError,
    } = this.state;
    const { pathname } = location;
    const functionToCall = this.setFunctionCalls();
    const isDisable = this.disableNextButton();
    this.setStepNoWithRouting();

    const data = {
      onUpdate: this.onUpdate,
      revealSecretFunc: this.revealSecret,
      revealSecret,
      confirmationPhrase,
    };

    const formData = {
      accountName,
      password,
      reEnteredPassword,
      date,
      animateRefreshIcon,
      identiconsId,
      error,
      containNumber,
      containCapitalLetter,
      hasLengthGreaterThanEight,
      selectedIcon,
      onUpdate: this.onUpdate,
      getRadioIconData: this.getRadioIconData,
      onRefresh: this.onRefresh,
      isAccountNameExists,
      selectIconError,
    };

    const isRestoreTab =
      location.pathname === '/restore-account' || location.pathname === '/confirm-restore';

    return (
      <div id="account-information" className="account-information">
        <Layout>
          <AccountProcess restoreAccount={isRestoreTab} stepNo={stepNo} />

          <CreateAccountHeader
            {...this.state}
            onUpdate={this.onUpdate}
            getRadioIconData={this.getRadioIconData}
            onRefresh={this.onRefresh}
            data={data}
            formData={formData}
          />

          <section style={{ padding: '40px 0' }}>
            <Container>
              <Row className="back-next-btn">
                <Col className="text-right">
                  <Button
                    className={
                      pathname === '/create-account' || pathname === '/restore-account'
                        ? 'light'
                        : ''
                    }
                    onClick={functionToCall.backButtonFunction}
                  >
                    <i className="fas fa-chevron-left" />
                    Back
                  </Button>
                </Col>
                <Col>
                  <Button
                    className={
                      isDisable ||
                      isDisable === undefined ||
                      pathname === '/confirm' ||
                      pathname === '/confirm-restore'
                        ? 'light'
                        : ''
                    }
                    onClick={
                      isDisable || isDisable === undefined
                        ? () => this.nextForIdenticonIcon()
                        : functionToCall.nextButtonFunction
                    }
                  >
                    Next 
                    {' '}
                    <i className="fas fa-chevron-right" />
                  </Button>
                </Col>
              </Row>
            </Container>
          </section>
        </Layout>
      </div>
    );
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(CreateAccount));
