import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Bip39 from 'bip39';
import PropTypes from 'prop-types';
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactToPrint from 'react-to-print';

import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import QRCode from '~/view/general/qr/index';
import copyToClipboard from '~/utility';
import { CONFIRMATION_PHASE } from '~/redux/constants';
import { createPublicPrivateKeys } from '~/redux/accountKeys/actions';
import { createMnemonic } from '~/redux/accountInfo/action';
import Identicons from '~/view/general/identicons/identicons';
import noView from '~/images/icons/no-view.png';
import { walletSetup } from '~/redux/accountManagement';

import AccountDetailPrint from '~/view/components/print-form/index';

class AccountInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.getMnemonics = this.getMnemonics.bind(this);
  }

  componentDidMount() {
    const { accountInfo, setMnemonicCode, setKeys } = this.props;
    let { mnemonic } = accountInfo;
    mnemonic = Bip39.generateMnemonic();
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

  // To  render account information print screen
  printAccountData() {
    const { accountInfo, accountKeys } = this.props;
    const { mnemonic } = accountInfo;
    const { publicAddress } = accountKeys;

    return (
      <div style={{ display: 'none' }}>
        {/* eslint-disable-next-line no-return-assign */}
        <div ref={el => (this.printAccountDetail = el)}>
          <AccountDetailPrint mnemonic={mnemonic} address={publicAddress} />
        </div>
      </div>
    );
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
          {this.printAccountData()}
          <Container>
            <Row className="acc-details bg-dark-light" style={{ marginBottom: accDetailsYSpaces }}>
              <Col className="left-col">
                <div className="acc-qr">
                  <QRCode bgColor="white" fgColor="black" address={publicAddress} />
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
                <QRCode bgColor="white" fgColor="black" address={publicAddress} />
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
                  <ReactToPrint
                    trigger={() => (
                      <Button>
                        <i className="fas fa-print" />
                        {' '}
                      </Button>
                    )}
                    content={() => this.printAccountDetail}
                  />
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
                      make a safe backup by writing it down on a physical paper or by printing a
                      copy.
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
                  Please back up the recovery phrase now. Make sure to keep it private and secure.
                  It allows full and unlimited access to your account, and can be used to restore
                  your wallet.
                </p>
                <FormGroup>
                  <Label for="msg" className="text-white">
                    Type
                    {' '}
                    <span className="text-primary">
                      &quot;
                      {CONFIRMATION_PHASE}
                      &quot;
                    </span>
                    {' '}
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
