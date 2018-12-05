import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AccountProcess from '../../components/account-process';
import Layout from '../../components/layout';
import { createAccount, incrementStepNo } from '../../../redux/accountInProgress/action';
import { getFantomBalance } from '../../../redux/getBalance/action';
import ValidationMethods from '../../../validations/userInputMethods';
import CreateAccountSection from './create-account-section';
import AccountInformation from '../account-information';
import Confirm from '../confirm';
import EnterMnemonics from '../enter-mnemonics';
import { CONFIRMATION_PHASE } from '../../../redux/constants';

const validationMethods = new ValidationMethods();

class CreateAccount extends React.PureComponent {
  constructor(props) {
    super(props);
    const initialInfo = this.getInitialAccountInfo();
    this.state = {
      accountName: initialInfo.accountName,
      password: initialInfo.password,
      reEnteredPassword: initialInfo.reEnteredPassword,
      date: new Date().getTime(),
      animateRefreshIcon: false,
      identiconsId: initialInfo.selectedIcon || '',
      selectedIcon: initialInfo.selectedIcon,
      error: false,
      containNumber: false,
      containCapitalLetter: false,
      hasLengthGreaterThanEight: false,
      nextButtonFunction: '',
      backButtonFunction: '',
      revealSecret: false,
      confirmationPhrase: '',
      isAccountNameExists: false,
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

  componentWillMount() {
    const { password } = this.state;
    this.isValidPassword('password', password);
    this.setStepNoWithRouting();
  }

  /**
   * @param {Name of the key} key
   * @param {Value of the key} value
   * This method will update the value of the given key
   */
  onUpdate(key, value) {
    this.setState(
      {
        [key]: value,
      },
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
    const { location, goToNextStep } = this.props;
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
    goToNextStep({ stepNo });
  }

  /**
   * This method will set the funciton calls on back and
   * next button according to the current route
   */
  setFunctionCalls() {
    const { location } = this.props;
    const { pathname } = location;
    let nextButtonFunction = this.createNewAccount;
    let backButtonFunction = () => true;
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
    const { goToNextStep, history } = this.props;
    goToNextStep({ stepNo: 3 });
    history.push('/confirm');
  }

  /**
   * This method will move to the Account information screen and set the step no
   */
  goToAccountInfoScreen() {
    const { goToNextStep, history, location } = this.props;
    const { pathname } = location;
    if (pathname === '/restore-account') {
      goToNextStep({ stepNo: 2 });
      history.push('/confirm-restore');
    } else {
      goToNextStep({ stepNo: 2 });
      this.setState({
        revealSecret: false,
        confirmationPhrase: '',
      });
      history.push('/account-information');
    }
  }

  goToAccountRestoreScreen() {
    const { history, goToNextStep } = this.props;
    const { identiconsId } = this.state;
    goToNextStep({ stepNo: 1 });
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
    const { goToNextStep, history } = this.props;
    const { identiconsId } = this.state;
    goToNextStep({ stepNo: 1 });
    this.setState({
      selectedIcon: identiconsId,
    });
    history.push('/create-account');
  }

  /**
   * This method will create the new account and set the state in the reducers
   */
  createNewAccount() {
    const { createNewAccount, goToNextStep, location, history, accountsList } = this.props;
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
      createNewAccount(data);
      if (pathname === '/restore-account') {
        goToNextStep({ stepNo: 2 });
        history.push('/confirm-restore');
      } else {
        goToNextStep({ stepNo: 2 });
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

  // eslint-disable-next-line class-methods-use-this
  /**
   * @param {Key name} key
   * @param {Value} value
   * This method check whether password is correct or not
   * and both the passwords are same
   */
  isValidPassword(key, value) {
    const { password } = this.state;
    const isValid = validationMethods.isPasswordCorrect(key, value);
    const isFalse = _.includes(isValid, false);
    if (key === 'password' && isFalse) {
      this.setState(isValid);
    }
    if (key === 'reEnteredPassword' && value !== '' && password !== value) {
      this.setState({
        error: true,
      });
    } else {
      isValid.error = false;
      this.setState(isValid);
    }
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
    if (isAnyFieldEmpty || isPasswordIncorrect || isAnyFieldUndefined || error) {
      return true;
    }

    return false;
  }

  /**
   * This method will check the status of the next button on the step two
   */
  disableNextButtonOnStepTwo() {
    const { revealSecret, confirmationPhrase } = this.state;
    const data = {
      revealSecret,
      confirmationPhrase,
    };
    const isAnyFieldEmpty = _.includes(data, '');
    const isAnyFieldUndefined = _.includes(data, undefined);
    const isPasswordIncorrect = _.includes(data, false);
    if (
      !isAnyFieldEmpty &&
      !isPasswordIncorrect &&
      !isAnyFieldUndefined &&
      confirmationPhrase === CONFIRMATION_PHASE
    ) {
      return false;
    }
    return true;
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

  render() {
    const { stepNo, location } = this.props;
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
    };
    const isRestoreTab =
      location.pathname === '/restore-account' || location.pathname === '/confirm-restore';
    return (
      <div id="account-information" className="account-information">
        <Layout>
          <AccountProcess restoreAccount={isRestoreTab} stepNo={stepNo} />

          <Header
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
                    <i className="fas fa-chevron-left" /> Back
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
                        ? () => true
                        : functionToCall.nextButtonFunction
                    }
                  >
                    Next <i className="fas fa-chevron-right" />
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

const Header = props => (
  <Switch>
    <Route path="/account-information" render={() => <AccountInformation {...props.data} />} />
    <Route
      path="/create-account"
      render={() => <CreateAccountSection formData={props.formData} />}
    />
    <Route
      path="/restore-account"
      render={() => <CreateAccountSection formData={props.formData} />}
    />
    <Route path="/confirm-restore" render={() => <EnterMnemonics {...props} />} />
    <Route path="/confirm" component={Confirm} />
  </Switch>
);

const mapStateToProps = state => ({
  accountName: state.accountInfo.accountName,
  password: state.accountInfo.password,
  selectedIcon: state.accountInfo.selectedIcon,
  stepNo: state.accountInfo.stepNo,
  accountsList: state.accounts.accountsList,
});

const mapDispatchToProps = dispatch => ({
  createNewAccount: data => dispatch(createAccount(data)),
  goToNextStep: data => dispatch(incrementStepNo(data)),
  getBalance: data => dispatch(getFantomBalance(data)),
});

CreateAccount.defaultProps = {
  stepNo: 0,
  accountName: '',
  password: '',
  selectedIcon: '',
};

CreateAccount.propTypes = {
  accountName: PropTypes.string,
  password: PropTypes.string,
  selectedIcon: PropTypes.string,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
  stepNo: PropTypes.number,
  accountsList: PropTypes.oneOfType([PropTypes.array]).isRequired,
  createNewAccount: PropTypes.func.isRequired,
  goToNextStep: PropTypes.func.isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(CreateAccount);
