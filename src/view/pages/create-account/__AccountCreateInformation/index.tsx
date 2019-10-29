import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Bip39 from 'bip39';
import { ToastContainer, ToastStore } from 'react-toasts'; 
import ReactToPrint from 'react-to-print';

import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import QRCode from '~/view/general/qr';
import copyToClipboard from '~/utility';
import { CONFIRMATION_PHASE } from '~/redux/constants';
import * as ACCOUNT_KEYS_ACTIONS from '~/redux/accountKeys/actions';
import * as ACCOUNT_INFO_ACIONS from '~/redux/accountInfo/action';
import Identicons from '~/view/general/identicons/identicons';
import noView from '~/images/icons/no-view.png';
import { walletSetup } from '~/redux/accountManagement';

import AccountDetailPrint from '~/view/components/print-form';

const mapStateToProps = state => ({
  accountInfo: state.accountInfo,
  accountKeys: state.accountKeys,
});

const mapDispatchToProps = {
  createPublicPrivateKeys: ACCOUNT_KEYS_ACTIONS.createPublicPrivateKeys,
  createMnemonic: ACCOUNT_INFO_ACIONS.createMnemonic,
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    confirmationPhrase: string;
    onUpdate: (key: string, value: string) => void;
  };

type State = {
  isSecretRevealed: boolean;
};

class AccountCreateInformation extends React.PureComponent<Props, State> {
  onRevealSecret = () => this.setState(state => ({ isSecretRevealed: !state.isSecretRevealed }));

  state = {
    isSecretRevealed: false,
  };

  printAccountDetail: HTMLDivElement | null = null;

  componentDidMount() {
    const { createMnemonic, createPublicPrivateKeys } = this.props;

    const mnemonic = Bip39.generateMnemonic();
    const keys = walletSetup(mnemonic);

    createPublicPrivateKeys({ publicAddress: keys.publicAddress });
    createMnemonic({ mnemonic });
  }

  render() {
    const {
      props: {
        accountInfo: { mnemonic, accountName, selectedIcon },
        accountKeys: { publicAddress },
        confirmationPhrase,
        onUpdate,
      },
      state: { isSecretRevealed },
      onRevealSecret,
    } = this;

    const accDetailsYSpaces = '26px';

    return (
      <div id="account-information" className="account-information">
        <section className="bg-dark" style={{ padding: `${accDetailsYSpaces} 0 60px` }}>
          <div style={{ display: 'none' }}>
            <div ref={el => (this.printAccountDetail = el)}>
              <AccountDetailPrint mnemonic={mnemonic} address={publicAddress} />
            </div>
          </div>

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
                      <ul className={!isSecretRevealed ? 'blur' : ''}>
                        {mnemonic && mnemonic.split(' ').map(word => <li key={word}>{word}</li>)}
                      </ul>

                      {!isSecretRevealed && (
                        <button className="blur-overley" type="button" onClick={onRevealSecret}>
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
                    Type&nbsp;
                    <span className="text-primary">
                      &quot;
                      {CONFIRMATION_PHASE}
                      &quot;
                    </span>
                    &nbsp; below to confirm it is backed up.
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountCreateInformation);
