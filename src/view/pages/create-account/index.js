import React from 'react';
import { connect } from 'react-redux';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import Bip39 from 'bip39';
import { compose } from 'redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Layout from '../../components/layout';
import CreateAccountForm from '../../components/forms/create-account';
import AccountProcess from '../../components/account-process';
import createAccount from '../../../redux/account/action';
import { createPublicPrivateKeys, createMnemonic } from '../../../redux/keys/actions';
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
      identiconsId: '',
      error: false,
      stepNo: 0,
    };
    this.createNewAccount = this.createNewAccount.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.getRadioIconData = this.getRadioIconData.bind(this);
  }

  componentDidMount() {
    const mnemonic = Bip39.generateMnemonic();
    const seed = Bip39.mnemonicToSeed(mnemonic); // creates seed buffer
    this.walletSetup(seed, mnemonic);
  }

  /**
   * @param {Name of the key} key
   * @param {Value of the key} value
   * This method will update the value of the given key
   */
  onUpdate(key, value) {
    this.setState({
      [key]: value,
    });
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
    const { accountName, password, reEnteredPassword, passwordHint } = SELF.props;
    return { accountName, password, reEnteredPassword, passwordHint };
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
    const { createNewAccount } = SELF.props;
    const { accountName, password, reEnteredPassword, passwordHint, identiconsId } = SELF.state;
    const data = {
      accountName,
      password,
      passwordHint,
      reEnteredPassword,
      selectedIcon: identiconsId,
    };
    createNewAccount(data);
    this.setState({
      stepNo: 1,
    });
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
    const SELF = this;
    const { password } = SELF.state;
    const isValid = validationMethods.isPasswordCorrect(value);
    if (!isValid) {
      this.setState({
        error: true,
      });
    } else if (key === 'reEnteredPassword' && value !== '' && password !== value) {
      this.setState({
        error: true,
      });
    } else {
      this.setState({
        error: false,
      });
    }
  }

  walletSetup(seed, mnemonic) {
    const SELF = this;
    const { setKeys, setMnemonicCode } = SELF.props;
    const root = Hdkey.fromMasterSeed(seed);
    const masterKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/60'/0'/0/0");
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey); //eslint-disable-line
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const publicKey = EthUtil.toChecksumAddress(addr);
    const privateKey = EthUtil.bufferToHex(addrNode._privateKey); //eslint-disable-line
    setKeys({ masterKey, publicKey, privateKey });
    setMnemonicCode({ mnemonic });
  }

  render() {
    const {
      accountName,
      password,
      reEnteredPassword,
      passwordHint,
      date,
      animateRefreshIcon,
      identiconsId,
      error,
      stepNo,
    } = this.state;
    return (
      <div id="account-information" className="account-information">
        {error && <p style={{ color: 'white' }}>Has Error</p>}
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
                    reEnteredPassword={reEnteredPassword}
                    passwordHint={passwordHint}
                    onUpdate={this.onUpdate}
                    createNewAccount={this.createNewAccount}
                    date={date}
                    animateRefreshIcon={animateRefreshIcon}
                    identiconsId={identiconsId}
                    onRefresh={this.onRefresh}
                    getRadioIconData={this.getRadioIconData}
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
                  <Button>
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
  reEnteredPassword: state.accountInfo.reEnteredPassword,
  passwordHint: state.accountInfo.passwordHint,
  selectedIcon: state.accountInfo.selectedIcon,
});

const mapDispatchToProps = dispatch => ({
  createNewAccount: data => {
    dispatch(() => createAccount(data));
  },
  setKeys: data => {
    dispatch(() => createPublicPrivateKeys(data));
  },
  setMnemonicCode: data => {
    dispatch(() => createMnemonic(data));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(CreateAccount);
