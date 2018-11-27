import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import Bip39 from 'bip39';
import { withRouter } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import QRCode from 'qrcode.react';
import { CONFIRMATION_PHASE } from '../../../redux/constants';
import Layout from '../../components/layout';
import AccountProcess from '../../components/account-process';
// import createMnemonic from '../../../redux/keys/actions';
import {
  createMnemonic,
  createAccount,
  incrementStepNo,
} from '../../../redux/accountInProgress/action';
import Identicons from '../../general/identicons/identicons';
// import qrImg from '../../../images/qr/FantomQR.jpg';
import noView from '../../../images/icons/no-view.png';

// const QR = () => (
//   <>
//     <img src={qrImg} className="w-100" alt="qr-img" />
//   </>
// );

class AccountInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // masterKey: '',
      publicKey: '',
      // privateKey: '',
      revealSecret: false,
      confirmationPhrase: '',
      // disableNextButton: false,
    };
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.revealSecret = this.revealSecret.bind(this);
    this.getMnemonics = this.getMnemonics.bind(this);
    this.goToNextScreen = this.goToNextScreen.bind(this);
    this.goToPreviousScreen = this.goToPreviousScreen.bind(this);
  }

  componentDidMount() {
    const SELF = this;
    const { accountInfo } = SELF.props;
    let { mnemonic } = accountInfo;
    if (!mnemonic) {
      mnemonic = Bip39.generateMnemonic();
    }
    const seed = Bip39.mnemonicToSeed(mnemonic); // creates seed buffer
    this.walletSetup(seed, mnemonic);
  }

  onUpdate(key, value) {
    this.setState({
      [key]: value,
    });
  }

  getMnemonics() {
    const SELF = this;
    const { accountInfo } = SELF.props;
    const { mnemonic } = accountInfo;
    const mnemonicsList = [];
    const generatedMnemonic = mnemonic ? mnemonic.split(' ') : mnemonic;
    if (generatedMnemonic && generatedMnemonic.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const name of generatedMnemonic) {
        mnemonicsList.push(<li>{name}</li>);
      }
    }

    return mnemonicsList;
  }

  revealSecret() {
    this.setState({
      revealSecret: true,
    });
  }

  goToNextScreen() {
    const SELF = this;
    const { goToStep, history } = SELF.props;
    goToStep({ stepNo: 3 });
    history.push('/account-management');
  }

  goToPreviousScreen() {
    const SELF = this;
    const { goToStep, history } = SELF.props;
    goToStep({ stepNo: 1 });
    history.push('/create-account');
  }

  walletSetup(seed, mnemonic) {
    const SELF = this;
    const { setMnemonicCode } = SELF.props;
    const root = Hdkey.fromMasterSeed(seed);
    // const masterK  ey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/60'/0'/0/0");
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey); //eslint-disable-line
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const publicKey = EthUtil.toChecksumAddress(addr);
    // const privateKey = EthUtil.bufferToHex(addrNode._privateKey); //eslint-disable-line
    // setKeys({ masterKey, publicKey, privateKey });
    this.setState({ publicKey });
    setMnemonicCode({ mnemonic });
  }

  copyToClipboard() {
    const SELF = this;
    const { accountKeys } = SELF.props;
    const { publicKey } = accountKeys;
    copy(publicKey);
  }

  render() {
    const SELF = this;
    const { accountInfo } = SELF.props;
    const { accountName, selectedIcon, stepNo } = accountInfo;
    const { publicKey, revealSecret, confirmationPhrase } = this.state;
    const getMnemonics = this.getMnemonics();
    const isConfirmationPhaseValid = confirmationPhrase === CONFIRMATION_PHASE;
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
          <section className="bg-dark" style={{ padding: '40px 0 70px' }}>
            <Container>
              <Row className="acc-details bg-dark-light" style={{ marginBottom: '30px' }}>
                <Col>
                  <div className="acc-qr">
                    {/* <QR /> */}
                    <QRCode value="publicKey" level="H" size={158} />
                  </div>
                  <div className="acc-name-holder">
                    <Identicons id={selectedIcon} width={50} size={3} />
                    <h2 className="acc-name">{accountName}</h2>
                  </div>
                  <h3 className="address">Your Address</h3>
                  <div className="account-no">
                    <p>
                      <span>
                        <button
                          type="button"
                          className="clipboard-btn"
                          onClick={this.copyToClipboard}
                        >
                          <i className="fas fa-clone" />
                        </button>
                      </span>
                      {publicKey}
                    </p>
                  </div>
                </Col>
                <Col className="qr-col">
                  {/* <QR /> */}
                  <QRCode value="publicKey" level="H" size={158} />
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col className="px-0">
                  <div className="add-wallet">
                    <h2 className="title ">
                      <span>Owner Recovery Phrase</span>
                    </h2>
                    <Button>
                      <i className="fas fa-print" />
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row className="bg-dark-light" style={{ padding: '90px 0' }}>
                <Col>
                  <Row style={{ padding: '0 0 90px' }}>
                    <Col>
                      <div id="mnemonic-collector">
                        <ul className={!revealSecret ? 'blur' : ''}>{getMnemonics}</ul>
                        {!revealSecret && (
                          <button
                            className="blur-overley"
                            type="button"
                            onClick={this.revealSecret}
                          >
                            <div className="holder">
                              <h2>Click Here To Reveal Secret Words</h2>
                            </div>
                          </button>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center no-capture">
                      <img src={noView} alt="no-view" />
                      <h2 className="text-danger">Screenshots are not secure</h2>
                      <p className="text-white mb-0">
                        If you take a screenshot, your backup may be viewed by other apps. You can
                        make a safe backup by writting down on a physical paper or print your
                        mnemonic passphrase.
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>

            <Container className="acc-footer">
              <Row>
                <Col>
                  <p className="text-white">
                    Please back up the recovery phase now. Make sure to keep it private and secure,
                    it allows full and unlimited access to your account and help you to restore your
                    wallet.
                  </p>
                  <FormGroup>
                    <Label for="msg" className="text-white">
                      Type{' '}
                      <span className="text-primary">
                        {'"'}
                        {CONFIRMATION_PHASE}
                        {'"'}
                      </span>
                      below to confirm it is backed up.
                    </Label>
                    <div className="input-holder">
                      <Input
                        type="text"
                        name="msg"
                        onChange={e => this.onUpdate('confirmationPhrase', e.currentTarget.value)}
                        id="msg"
                        value={confirmationPhrase}
                        autoFocus={false}
                      />
                      <i className="fas fa-pencil-alt" />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </section>
          <section style={{ padding: '40px 0' }}>
            <Container>
              <Row className="back-next-btn">
                <Col className="text-right">
                  <Button className="light" onClick={this.goToPreviousScreen}>
                    <i className="fas fa-chevron-left" /> Back
                  </Button>
                </Col>
                <Col>
                  <Button
                    className={isConfirmationPhaseValid ? '' : 'light'}
                    onClick={this.goToNextScreen}
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
  accountInfo: state.accountInfo,
  stepNo: state.accountInfo.stepNo,
});

const mapDispatchToProps = dispatch => ({
  // setKeys: data => {
  //   dispatch(() => createPublicPrivateKeys(data));
  // },
  incrementStepNo: data => {
    dispatch(() => createAccount(data));
  },
  setMnemonicCode: data => {
    dispatch(() => createMnemonic(data));
  },
  goToStep: data => {
    dispatch(() => incrementStepNo(data));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(AccountInformation);
