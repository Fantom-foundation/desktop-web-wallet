import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import _ from 'lodash';
import CreateAccountForm from '../../components/forms/create-account';
import { createAccount, incrementStepNo } from '../../../redux/accountInProgress/action';
import ValidationMethods from '../../../validations/userInputMethods';

const validationMethods = new ValidationMethods();

class CreateAccountSection extends React.PureComponent {
  constructor(props) {
    super(props);
    const initialInfo = this.getInitialAccountInfo();
    this.state = {
      accountName: initialInfo.accountName,
      password: initialInfo.password,
      reEnteredPassword: initialInfo.reEnteredPassword,
      passwordHint: initialInfo.passwordHint,
      // date: new Date().getTime(),
      // animateRefreshIcon: false,
      identiconsId: '',
      selectedIcon: initialInfo.selectedIcon,
      error: false,
      containNumber: false,
      containCapitalLetter: false,
      hasLengthGreaterThanEight: false,
    };
    this.createNewAccount = this.createNewAccount.bind(this);
  }

  componentWillMount() {
    const { password } = this.state;
    this.isValidPassword('password', password);
  }

  /**
   * This method will return the initial account information
   */
  getInitialAccountInfo() {
    const SELF = this;
    const { accountName, password, passwordHint, selectedIcon } = SELF.props;
    return { accountName, password, passwordHint, selectedIcon };
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
      selectedIcon,
      identiconsId,
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
      selectedIcon,
      onUpdate,
      getRadioIconData,
      onRefresh,
    } = SELF.props;
    console.log(SELF.props, 'SELF.propsSELF.props');
    console.log(accountName, 'accountNameaccountName');
    return (
      <div id="account-information" className="account-information">
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
                  onUpdate={onUpdate}
                  date={date}
                  animateRefreshIcon={animateRefreshIcon}
                  identiconsId={identiconsId}
                  selectedIcon={selectedIcon}
                  onRefresh={onRefresh}
                  getRadioIconData={getRadioIconData}
                  containNumber={containNumber}
                  containCapitalLetter={containCapitalLetter}
                  hasLengthGreaterThanEight={hasLengthGreaterThanEight}
                />
              </Col>
            </Row>
          </Container>
        </section>
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
)(CreateAccountSection);
