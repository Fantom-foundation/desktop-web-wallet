import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import {
  createMnemonic,
  createAccount,
  incrementStepNo,
  emptyState,
} from '../../../redux/accountInProgress/action';
import createWallet from '../../../redux/account/action';
import CancelWalletModal from '../../components/modals/cancel-wallet';
import IncorrectMnemonicsModal from '../../components/modals/incorrect-mnemonics';

class Confirm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMnemonicsArray: [],
      mnemonicsArray: [],
      toggleModal: false,
      openIncorrectMnemonicsModal: false,
    };
    this.selectMnemonic = this.selectMnemonic.bind(this);
    this.getMnemonics = this.getMnemonics.bind(this);
    this.getSelectedMnemonics = this.getSelectedMnemonics.bind(this);
    this.createWallet = this.createWallet.bind(this);
    this.cancelWallet = this.cancelWallet.bind(this);
    this.cancelModalToggle = this.cancelModalToggle.bind(this);
    this.toggleIncorrectMnemonicsModal = this.toggleIncorrectMnemonicsModal.bind(this);
  }

  componentWillMount() {
    const mnemonics = this.getMnemonics();
    this.setState({
      mnemonicsArray: mnemonics,
    });
  }

  /**
   * This method will return the mnemonics list
   */
  getMnemonics() {
    const SELF = this;
    const { accountInfo } = SELF.props;
    const { mnemonic } = accountInfo;
    let mnemonicsList = [];
    const generatedMnemonic = mnemonic ? mnemonic.split(' ') : mnemonic;
    if (generatedMnemonic && generatedMnemonic.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const name of generatedMnemonic) {
        const index = _.findIndex(generatedMnemonic, mnemonicName => mnemonicName === name);
        mnemonicsList.push(
          <li className={`${name}_${index}`}>
            <Button color="primary" onClick={() => SELF.selectMnemonic(name)}>
              {name}
            </Button>
          </li>
        );
      }
    }
    mnemonicsList = _.shuffle(mnemonicsList);

    return mnemonicsList;
  }

  /**
   * This method will return the selected mnemonics
   */
  getSelectedMnemonics() {
    const SELF = this;
    const { selectedMnemonicsArray } = this.state;
    const mnemonicsList = [];
    if (selectedMnemonicsArray && selectedMnemonicsArray.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const name of selectedMnemonicsArray) {
        mnemonicsList.push(
          <li>
            <Button color="primary" onClick={() => SELF.unselectMnemonic(name)}>
              {name}
            </Button>
          </li>
        );
      }
    }

    return mnemonicsList;
  }

  /**
   * @param {Name of the mnemonic} name
   * This method will remove the mnemonic from the selected mnemonics
   */
  unselectMnemonic(name) {
    const SELF = this;
    const { accountInfo } = SELF.props;
    const { mnemonic } = accountInfo;
    const { selectedMnemonicsArray } = SELF.state;
    const clonedArray = selectedMnemonicsArray.slice();
    const index = _.findIndex(mnemonic.split(' '), mnemonicName => mnemonicName === name);
    const selectedIndex = _.findIndex(
      selectedMnemonicsArray,
      mnemonicName => mnemonicName === name
    );
    // eslint-disable-next-line no-undef
    const findSelectedMnemonic = document.getElementsByClassName(`${name}_${index}`);
    if (findSelectedMnemonic) {
      findSelectedMnemonic[0].classList.remove('selected');
    }
    clonedArray.splice(selectedIndex, 1);
    SELF.setState({
      selectedMnemonicsArray: clonedArray,
    });
  }

  /**
   * @param {Name of the mnemonic} name
   * This method will push the selected mnemonic in the selected mnemonic array
   */
  selectMnemonic(name) {
    const SELF = this;
    const { accountInfo } = SELF.props;
    const { mnemonic } = accountInfo;
    const { selectedMnemonicsArray } = SELF.state;
    const clonedArray = selectedMnemonicsArray.slice();
    const index = _.findIndex(mnemonic.split(' '), mnemonicName => mnemonicName === name);
    const selectedIndex = _.findIndex(
      selectedMnemonicsArray,
      mnemonicName => mnemonicName === name
    );
    // eslint-disable-next-line no-undef
    const findSelectedMnemonic = document.getElementsByClassName(`${name}_${index}`);
    if (findSelectedMnemonic) {
      findSelectedMnemonic[0].classList.add('selected');
    }
    if (selectedIndex === -1) {
      clonedArray.push(name);
      SELF.setState({
        selectedMnemonicsArray: clonedArray,
      });
    }
  }

  /**
   * This method will cancel the wallet creation process
   */
  cancelWallet() {
    const SELF = this;
    const { accountsList, history, resetState } = SELF.props;
    if (accountsList.length === 0) {
      history.push('/create-account');
      // This method will reset the state of accountInfo reducer
      resetState();
    } else {
      history.push('/account-management');
      resetState();
    }
  }

  /**
   * This method will create the wallet
   */
  createWallet() {
    const SELF = this;
    const { addWallet, accountInfo, publicAddress, history, resetState } = SELF.props;
    const { mnemonic } = accountInfo;
    const { selectedMnemonicsArray } = this.state;
    let data = {
      ...accountInfo,
      publicAddress,
    };
    data = _.omit(data, ['stepNo']);
    if (selectedMnemonicsArray.join(' ') === mnemonic) {
      addWallet(data);
      resetState();
      history.push('/account-management');
    } else {
      this.toggleIncorrectMnemonicsModal();
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
    const { mnemonicsArray, toggleModal, openIncorrectMnemonicsModal } = this.state;
    const selectedMnemonics = this.getSelectedMnemonics();
    return (
      <div id="confirm" className="confirm">
        <section className="bg-dark">
          <Container>
            <Row>
              <Col className="px-0">
                <div className="add-wallet">
                  <h2 className="title ">
                    <span>Enter Your Mnemonic</span>
                  </h2>
                  <Button>
                    <i className="fas fa-sync-alt" />
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div id="mnemonic-selector">
                  <h2 className="text-white">Enter Your Mnemonic to create your account below</h2>
                  <Row className="bg-dark-light">
                    <Col>
                      <div className="mnemonic-container">
                        <ul>{selectedMnemonics}</ul>
                      </div>
                      <div className="mnemonic-selector">
                        <ul>{mnemonicsArray}</ul>
                      </div>
                    </Col>
                  </Row>
                  <div className="mnemonic-btn">
                    <Button className="create-wallet" onClick={this.createWallet}>
                      Create Wallet
                    </Button>
                    <Button className="cancel" onClick={this.cancelModalToggle}>
                      Cancel
                    </Button>
                  </div>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountInfo: state.accountInfo,
  stepNo: state.accountInfo.stepNo,
  publicAddress: state.accountKeys.publicAddress,
  accountsList: state.accounts.accountsList,
});

const mapDispatchToProps = dispatch => ({
  incrementStepNo: data => {
    dispatch(() => createAccount(data));
  },
  setMnemonicCode: data => {
    dispatch(() => createMnemonic(data));
  },
  goToStep: data => {
    dispatch(() => incrementStepNo(data));
  },
  addWallet: data => {
    dispatch(() => createWallet(data));
  },
  resetState: () => {
    dispatch(() => emptyState());
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Confirm);
