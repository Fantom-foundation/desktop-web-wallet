import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import _ from 'lodash';
import AccountProcess from '../../components/account-process';
import Layout from '../../components/layout';
import {
  createAccount,
  incrementStepNo,
  setNextButtonStatus,
} from '../../../redux/accountInProgress/action';
import ValidationMethods from '../../../validations/userInputMethods';
import CreateAccountSection from './create-account-section';
import AccountInformation from '../account-information';
import Confirm from '../confirm';

const validationMethods = new ValidationMethods();

class CreateAccount extends React.PureComponent {
  constructor(props) {
    super(props);
    const initialInfo = this.getInitialAccountInfo();
    this.state = {
      accountName: initialInfo.accountName,
      password: initialInfo.password,
      reEnteredPassword: initialInfo.reEnteredPassword,
      passwordHint: initialInfo.passwordHint,
      date: new Date().getTime(),
      animateRefreshIcon: false,
      identiconsId: '',
      selectedIcon: initialInfo.selectedIcon,
      error: false,
      containNumber: false,
      containCapitalLetter: false,
      hasLengthGreaterThanEight: false,
    };
    this.createNewAccount = this.createNewAccount.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.getRadioIconData = this.getRadioIconData.bind(this);
  }

  componentWillMount() {
    const { password } = this.state;
    const { setButtonStatus } = this.props;
    this.isValidPassword('password', password);
    const isDisable = this.disableNextButton();
    setButtonStatus({ isDisable });
  }

  /**
   * @param {Name of the key} key
   * @param {Value of the key} value
   * This method will update the value of the given key
   */
  onUpdate(key, value) {
    const SELF = this;
    this.setState(
      {
        [key]: value,
      },
      () => {
        SELF.disableNextButton();
      }
    );
    if (key === 'password' || key === 'reEnteredPassword') {
      this.isValidPassword(key, value);
    }
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
    const SELF = this;
    const { accountName, password, passwordHint, selectedIcon } = SELF.props;
    return { accountName, password, passwordHint, selectedIcon };
  }

  /**
   * @param {Selected Icon ID} identiconsId
   * This method will set the icon Id
   */
  getRadioIconData(identiconsId) {
    this.setState({
      identiconsId,
    });
  }

  /**
   * This method will create the new account and set the state in the reducers
   */
  createNewAccount() {
    const SELF = this;
    const { createNewAccount, goToNextStep } = SELF.props;
    const { accountName, password, reEnteredPassword, passwordHint, identiconsId } = this.state;
    const data = {
      accountName,
      password,
      passwordHint,
      reEnteredPassword,
      selectedIcon: identiconsId,
    };
    createNewAccount(data);
    goToNextStep({ stepNo: 2 });
    SELF.props.history.push('/account-information');
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

  disableNextButton() {
    const {
      accountName,
      password,
      reEnteredPassword,
      passwordHint,
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
      passwordHint,
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

  render() {
    const SELF = this;
    // const {
    //   accountName,
    //   password,
    //   reEnteredPassword,
    //   passwordHint,
    //   date,
    //   animateRefreshIcon,
    //   identiconsId,
    //   error,
    //   containNumber,
    //   containCapitalLetter,
    //   hasLengthGreaterThanEight,
    //   selectedIcon,
    // } = this.state;
    const { stepNo, isDisable, setButtonStatus } = SELF.props;
    console.log(SELF.props, 'SELF.props');
    const disableNextButton = this.disableNextButton();
    console.log(disableNextButton, 'disableNextButton');
    setButtonStatus({ isDisable: disableNextButton });
    return (
      <div id="account-information" className="account-information">
        <Layout>
          <section style={{ padding: '90px 0' }}>
            <Container>
              <Row>
                <Col>
                  <AccountProcess stepNo={stepNo} />
                </Col>
              </Row>
            </Container>
          </section>
          {/* <section className="bg-dark" style={{ padding: '80px 0' }}>
            <Container>
              <Row>
                <Col>
                  <CreateAccountForm
                    accountName={accountName}
                    password={password}
                    error={error}
                    reEnteredPassword={reEnteredPassword}
                    passwordHint={passwordHint}
                    onUpdate={this.onUpdate}
                    date={date}
                    animateRefreshIcon={animateRefreshIcon}
                    identiconsId={identiconsId}
                    selectedIcon={selectedIcon}
                    onRefresh={this.onRefresh}
                    getRadioIconData={this.getRadioIconData}
                    containNumber={containNumber}
                    containCapitalLetter={containCapitalLetter}
                    hasLengthGreaterThanEight={hasLengthGreaterThanEight}
                  />
                </Col>
              </Row>
            </Container>
          </section> */}
          <Header
            {...this.state}
            onUpdate={this.onUpdate}
            getRadioIconData={this.getRadioIconData}
            onRefresh={this.onRefresh}
          />
          <section style={{ padding: '40px 0' }}>
            <Container>
              <Row className="back-next-btn">
                <Col className="text-right">
                  <Button className="light">
                    <i className="fas fa-chevron-left" /> Back
                  </Button>
                </Col>
                <Col>
                  <Button
                    className={isDisable ? 'light' : ''}
                    onClick={isDisable ? () => true : this.createNewAccount}
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

const Header = props => {
  console.log(props);
  return (
    // <BrowserRouter>
    <Switch>
      <Route path="/account-information" component={AccountInformation} />
      <Route path="/create-account" render={() => <CreateAccountSection {...props} />} />
      <Route path="/confirm" component={Confirm} />
    </Switch>
    // </BrowserRouter>
  );
};

// const Feed = props => (
//   <Content>
//     {props.item ? (
//       <ItemState {...props} />
//     ) : props.feed ? (
//       <NormalState {...props} />
//     ) : (
//       <EmptyState />
//     )}
//   </Content>
// );

const mapStateToProps = state => ({
  accountName: state.accountInfo.accountName,
  password: state.accountInfo.password,
  passwordHint: state.accountInfo.passwordHint,
  selectedIcon: state.accountInfo.selectedIcon,
  stepNo: state.accountInfo.stepNo,
  isDisable: state.accountInfo.isNextButtonDisable,
});

const mapDispatchToProps = dispatch => ({
  createNewAccount: data => {
    dispatch(() => createAccount(data));
  },
  goToNextStep: data => {
    dispatch(() => incrementStepNo(data));
  },
  setButtonStatus: data => {
    dispatch(() => setNextButtonStatus(data));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(CreateAccount);
