import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import {
  createAccount,
  incrementStepNo,
  createMnemonic,
  emptyState,
} from '../../../redux/accountInProgress/action';
import createWallet from '../../../redux/account/action';

class EnterMnemonics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enteredMnemonic: '',
    };
    this.onUpdate = this.onUpdate.bind(this);
    this.createWallet = this.createWallet.bind(this);
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

  checkMnemonicIsCorrect() {
    const { enteredMnemonic } = this.state;
    const mnemonicsArray = enteredMnemonic.split(',');
    if (mnemonicsArray.length === 12) {
      return true;
    }
    return false;
  }

  createWallet() {
    const SELF = this;
    const { enteredMnemonic } = this.state;
    const {
      accountName,
      password,
      passwordHint,
      identiconsId,
      setMnemonicCode,
      removeAccount,
      history,
      addWallet,
    } = SELF.props;
    const data = {
      accountName,
      password,
      passwordHint,
      selectedIcon: identiconsId,
    };
    const isMnemonicCorrect = this.checkMnemonicIsCorrect();
    if (isMnemonicCorrect) {
      data.mnemonic = enteredMnemonic;
      addWallet(data);
      removeAccount();
      setMnemonicCode({ mnemonic: enteredMnemonic });
      history.push('/account-management');
    } else {
      console.log('data-incorrect');
    }
  }

  render() {
    const { enteredMnemonic } = this.state;
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
                      placeholder="Seprate each word with a single space"
                      onChange={e => this.onUpdate('enteredMnemonic', e.currentTarget.value)}
                      value={enteredMnemonic}
                    />
                  </FormGroup>
                  <div className="text-center">
                    <p className="text-white">
                      Enter your secret twelve word phrase here to restore your vault.
                    </p>
                    <p className="text-danger">Seprate each word with a single space</p>
                  </div>
                </div>
              </div>
              <div className="mnemonic-btn">
                <Button className="create-wallet" onClick={this.createWallet}>
                  Create Wallet
                </Button>
                <Button className="cancel" onClick={this.cancelWallet}>
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
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
