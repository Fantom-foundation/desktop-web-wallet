import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Bip39 from 'bip39';
import PropTypes from 'prop-types';
import { ToastContainer, ToastStore } from 'react-toasts';
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import QRCode from 'qrcode.react';
import copyToClipboard from '../../../utility';
import { CONFIRMATION_PHASE } from '../../../redux/constants';
import { createPublicPrivateKeys } from '../../../redux/keys/actions';
import { createMnemonic } from '../../../redux/accountInProgress/action';
import Identicons from '../../general/identicons/identicons';
import noView from '../../../images/icons/no-view.png';
import { walletSetup } from '../../../redux/accountManagement';

class AccountInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.getMnemonics = this.getMnemonics.bind(this);
  }

  componentDidMount() {
    const { accountInfo, setMnemonicCode, setKeys } = this.props;
    let { mnemonic } = accountInfo;
    if (!mnemonic) {
      mnemonic = Bip39.generateMnemonic();
    }
    const keys = walletSetup(mnemonic);
    setKeys({ publicAddress: keys.publicAddress });
    setMnemonicCode({ mnemonic });
  }

  /**
   * @param {State Variable} key
   * @param {Value of the variable} value
   * This method will update the value of the state variables
   */
  onUpdate(key, value) {
    this.setState({
      [key]: value,
    });
  }

  /**
   * This method will return the list of the Mnemonics
   */
  getMnemonics() {
    const { accountInfo } = this.props;
    const { mnemonic } = accountInfo;
    const mnemonicsList = [];
    const generatedMnemonic = mnemonic ? mnemonic.split(' ') : mnemonic;
    if (generatedMnemonic && generatedMnemonic.length > 0) {
      for (let i = 0; i < generatedMnemonic.length; i += 1) {
        mnemonicsList.push(<li key={i}>{generatedMnemonic[i]}</li>);
      }
    }

    return mnemonicsList;
  }

  render() {
    const {
      accountInfo,
      accountKeys,
      revealSecret,
      revealSecretFunc,
      confirmationPhrase,
      onUpdate,
    } = this.props;
    const { accountName, selectedIcon } = accountInfo;
    const { publicAddress } = accountKeys;
    const getMnemonics = this.getMnemonics();
    const accDetailsYSpaces = '26px';
    return (
      <div id="account-information" className="account-information">
        <section className="bg-dark" style={{ padding: `${accDetailsYSpaces} 0 60px` }}>
          <Container>
            <Row className="acc-details bg-dark-light" style={{ marginBottom: accDetailsYSpaces }}>
              <Col className="left-col">
                <div className="acc-qr">
                  <QRCode bgColor="white" fgColor="black" value="publicKey" level="H" size={158} />
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
                        onClick={e => copyToClipboard(e, publicAddress)}
                      >
                        <i className="fas fa-clone" />
                      </button>
                    </span>
                    {publicAddress}
                  </p>
                </div>
              </Col>
              <Col className="qr-col">
                <QRCode bgColor="black" fgColor="white" value="publicKey" level="H" size={158} />
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
            <Row className="bg-dark-light" style={{ padding: '40px 0' }}>
              <Col>
                <Row style={{ padding: '0 0 40px' }}>
                  <Col>
                    <div id="mnemonic-collector">
                      <ul className={!revealSecret ? 'blur' : ''}>{getMnemonics}</ul>
                      {!revealSecret && (
                        <button className="blur-overley" type="button" onClick={revealSecretFunc}>
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
                      make a safe backup by writting down on a physical paper or print your mnemonic
                      passphrase.
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
                  Please back up the recovery phase now. Make sure to keep it private and secure, it
                  allows full and unlimited access to your account and can be used to restore your
                  wallet.
                </p>
                <FormGroup>
                  <Label for="msg" className="text-white">
                    Type{' '}
                    <span className="text-primary">
                      {'"'}
                      {CONFIRMATION_PHASE}
                      {'"'}
                    </span>{' '}
                    below to confirm it is backed up.
                  </Label>
                  <div className="input-holder">
                    <Input
                      type="text"
                      name="msg"
                      onChange={e => onUpdate('confirmationPhrase', e.currentTarget.value)}
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
          <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountInfo: state.accountInfo,
  accountKeys: state.accountKeys,
});

const mapDispatchToProps = dispatch => ({
  setKeys: data => dispatch(createPublicPrivateKeys(data)),
  setMnemonicCode: data => dispatch(createMnemonic(data)),
});

AccountInformation.propTypes = {
  accountInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  accountKeys: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setKeys: PropTypes.func.isRequired,
  setMnemonicCode: PropTypes.func.isRequired,
  revealSecret: PropTypes.bool.isRequired,
  revealSecretFunc: PropTypes.func.isRequired,
  confirmationPhrase: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountInformation);
