import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import Bip39 from 'bip39';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import {
  createAccount,
  incrementStepNo,
  createMnemonic,
  emptyState,
} from '../../../redux/accountInProgress/action';
import createWallet from '../../../redux/account/action';
import CancelWalletModal from '../../components/modals/cancel-wallet';
import IncorrectMnemonicsModal from '../../components/modals/incorrect-mnemonics';
import ValidationMethods from '../../../validations/userInputMethods';

const validationMethods = new ValidationMethods();

class EnterMnemonics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enteredMnemonic: '',
      toggleModal: false,
      openIncorrectMnemonicsModal: false,
    };
    this.onUpdate = this.onUpdate.bind(this);
    this.createWallet = this.createWallet.bind(this);
    this.cancelWallet = this.cancelWallet.bind(this);
    this.cancelModalToggle = this.cancelModalToggle.bind(this);
    this.toggleIncorrectMnemonicsModal = this.toggleIncorrectMnemonicsModal.bind(this);
    this.checkMnemonicIsCorrect = this.checkMnemonicIsCorrect.bind(this);
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
  }

  // eslint-disable-next-line class-methods-use-this
  isValidSeedNames(seed) {
    if (seed && seed.length > 0) {
      return seed.map(name => validationMethods.noSpecialChars(name));
    }

    return false;
  }

  checkMnemonicIsCorrect() {
    let { enteredMnemonic } = this.state;
    enteredMnemonic = enteredMnemonic.trim();
    const mnemonicsArray = enteredMnemonic.split(' ');
    const isValidSeedNames = this.isValidSeedNames(mnemonicsArray);
    const isAnyFalseName = _.includes(isValidSeedNames, false);
    if (mnemonicsArray.length === 12 && !isAnyFalseName) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  walletSetup(seed) {
    const root = Hdkey.fromMasterSeed(seed);
    // const masterKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/60'/0'/0/0");
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey); //eslint-disable-line
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const publicAddress = EthUtil.toChecksumAddress(addr);
    const privateKey = EthUtil.bufferToHex(addrNode._privateKey); //eslint-disable-line
    return { privateKey, publicAddress };
  }

  createWallet() {
    const SELF = this;
    const { enteredMnemonic } = this.state;
    const {
      accountName,
      passwordHint,
      identiconsId,
      removeAccount,
      history,
      addWallet,
    } = SELF.props;
    let data = {
      accountName,
      passwordHint,
      selectedIcon: identiconsId,
    };
    const isMnemonicCorrect = this.checkMnemonicIsCorrect();
    if (isMnemonicCorrect) {
      const seed = Bip39.mnemonicToSeed(enteredMnemonic); // creates seed buffer
      const keys = this.walletSetup(seed, enteredMnemonic);
      data = { ...keys, ...data };
      addWallet(data);
      removeAccount();
      history.push('/account-management');
    } else {
      this.toggleIncorrectMnemonicsModal();
    }
  }

  /**
   * This method will cancel the wallet creation process
   */
  cancelWallet() {
    const SELF = this;
    const { accountsList, history, removeAccount } = SELF.props;
    if (accountsList.length === 0) {
      history.push('/create-account');
      // This method will reset the state of accountInfo reducer
      removeAccount();
    } else {
      history.push('/account-management');
      removeAccount();
    }
  }

  /**
   * This method will toggle the cancel wallet modal
   */
  cancelModalToggle() {
    const { toggleModal } = this.state;
    this.setState({
      toggleModal: !toggleModal,
    });
  }

  /**
   * This method will toggle the Incorrect Mnemonics modal
   */
  toggleIncorrectMnemonicsModal() {
    const { openIncorrectMnemonicsModal } = this.state;
    this.setState({
      openIncorrectMnemonicsModal: !openIncorrectMnemonicsModal,
    });
  }

  render() {
    const { toggleModal, openIncorrectMnemonicsModal, enteredMnemonic } = this.state;
    return (
      <section className="bg-dark">
        <Container>
          <Row>
            <Col>
              <div className="restore-confirm">
                <div className="wallet-bar">
                  <h2 className="title">
                    <span>Restore Wallet</span>
                  </h2>
                </div>
                <div className="vault-container bg-dark-light">
                  {/* <input
                    type="text"
                    onChange={e => this.onUpdate('enteredMnemonic', e.currentTarget.value)}
                    value={enteredMnemonic}
                  /> */}
                  <FormGroup>
                    <Label for="wallet-seed">Wallet Seed</Label>
                    <Input
                      type="textarea"
                      name="wallet-seed"
                      id="wallet-seed"
                      placeholder="Separate each word with a single space"
                      onChange={e => this.onUpdate('enteredMnemonic', e.currentTarget.value)}
                      value={enteredMnemonic}
                    />
                  </FormGroup>
                  <div className="text-center">
                    <p className="text-white">
                      Enter your secret twelve word phrase here to restore your vault.
                    </p>
                    <p className="text-danger">Separate each word with a single space</p>
                  </div>
                </div>
              </div>
              <div className="mnemonic-btn">
                <Button className="create-wallet" onClick={this.createWallet}>
                  Create Wallet
                </Button>
                <Button className="cancel" onClick={this.cancelModalToggle}>
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <CancelWalletModal
          toggleModal={toggleModal}
          cancelModalToggle={this.cancelModalToggle}
          cancelWallet={this.cancelWallet}
        />
        <IncorrectMnemonicsModal
          openIncorrectMnemonicsModal={openIncorrectMnemonicsModal}
          toggleIncorrectMnemonicsModal={this.toggleIncorrectMnemonicsModal}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  accountName: state.accountInfo.accountName,
  password: state.accountInfo.password,
  passwordHint: state.accountInfo.passwordHint,
  selectedIcon: state.accountInfo.selectedIcon,
  stepNo: state.accountInfo.stepNo,
  accountsList: state.accounts.accountsList,
});

const mapDispatchToProps = dispatch => ({
  createNewAccount: data => {
    dispatch(() => createAccount(data));
  },
  goToNextStep: data => {
    dispatch(() => incrementStepNo(data));
  },
  setMnemonicCode: data => {
    dispatch(() => createMnemonic(data));
  },
  removeAccount: () => {
    dispatch(() => emptyState());
  },
  addWallet: data => {
    dispatch(() => createWallet(data));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(EnterMnemonics);
