import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Layout from '../../components/layout';
import CreateAccountForm from '../../components/forms/create-account';
import AccountProcess from '../../components/account-process';
import { createAccount, incrementStepNo } from '../../../redux/accountInProgress/action';
import ValidationMethods from '../../../validations/userInputMethods';

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
      identiconsId: initialInfo.selectedIcon,
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
        SELF.disableNextButton(key, value);
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
    const isValid = validationMethods.isPasswordCorrect(value);
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
      containNumber,
      containCapitalLetter,
      hasLengthGreaterThanEight,
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
    const isAnyFieldEmpty = _.includes(data, '');
    const isPasswordIncorrect = _.includes(data, false);
    if (isAnyFieldEmpty || isPasswordIncorrect) {
      return true;
    }
    return false;
  }

  render() {
    const SELF = this;
    const {
      accountName,
      password,
      reEnteredPassword,
      passwordHint,
      date,
      animateRefreshIcon,
      identiconsId,
      error,
      containNumber,
      containCapitalLetter,
      hasLengthGreaterThanEight,
    } = this.state;
    const { stepNo } = SELF.props;
    const disableNextButton = this.disableNextButton();
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
          <section className="bg-dark" style={{ padding: '80px 0' }}>
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
                    onRefresh={this.onRefresh}
                    getRadioIconData={this.getRadioIconData}
                    containNumber={containNumber}
                    containCapitalLetter={containCapitalLetter}
                    hasLengthGreaterThanEight={hasLengthGreaterThanEight}
                  />
                </Col>
              </Row>
            </Container>
          </section>
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
                    className={disableNextButton ? 'light' : ''}
                    onClick={disableNextButton ? () => true : this.createNewAccount}
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

const mapStateToProps = state => ({
  accountName: state.accountInfo.accountName,
  password: state.accountInfo.password,
  passwordHint: state.accountInfo.passwordHint,
  selectedIcon: state.accountInfo.selectedIcon,
  stepNo: state.accountInfo.stepNo,
});

const mapDispatchToProps = dispatch => ({
  createNewAccount: data => {
    dispatch(() => createAccount(data));
  },
  goToNextStep: data => {
    dispatch(() => incrementStepNo(data));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(CreateAccount);
