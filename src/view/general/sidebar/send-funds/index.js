import React from 'react';
import { Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Web3 from 'web3';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _ from 'lodash';
import BigInt from 'big-integer';
import addressImage from '../../../../images/address.svg';
import amountImage from '../../../../images/amount.svg';
import passwordImage from '../../../../images/password.svg';
import { getFantomBalance } from '../../../../redux/getBalance/action';
import Loader from '../../loader';
import AccountList from '../../../pages/account-details/transferMoney/accountList';
import { isAccountPasswordCorrect } from '../../../../redux/accountManagement';

class SendMoney extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isValidAddress: false,
      loading: false,
    };
    this.disableContinueButton = this.disableContinueButton.bind(this);
    this.isTransferDataCorrect = this.isTransferDataCorrect.bind(this);
    this.onConfirmSend = this.onConfirmSend.bind(this);
  }

  /**
   * This method will redirect user to the configm screen
   * If the data is correct
   */
  async onConfirmSend() {
    const { onConfirmSend, toAddress, password, selectedAccount } = this.props;
    const isCorrect = await this.isTransferDataCorrect();
    if (!isCorrect) {
      onConfirmSend(toAddress, selectedAccount.publicAddress, password);
    }
  }

  /**
   *  handleSendMoney()  : This function is meant for handling input box validations ,
   *  and navigate to CheckSend screen if all fields are filled.
   */
  handleSendMoney() {
    const { address, ftmAmount, password } = this.state;

    let message = '';
    if (address === '') {
      message = 'Please enter address.';
    } else if (!Web3.utils.isAddress(address)) {
      message = 'Please enter valid address.';
    } else if (ftmAmount === '') {
      message = 'Please enter valid amount';
    } else if (password === '') {
      message = 'Please enter password to continue!!';
      this.setState({
        verificationError: message,
      });
    }
    if (message !== '') {
      return false;
    }
    this.setState({
      loading: true,
    });
    return true;
  }

  /**
   * addressVerification() : To check address entered is valid address or not, if valid address then display green tick. Otherwise render error message.
   */
  addressVerification(address) {
    if (!Web3.utils.isAddress(address)) {
      return { status: false, message: 'Invalid Address' };
    }
    return { status: true, message: '' };
  }

  /**
   * ftmAmmountVerification() : To check ammount entered is valid or not, if invalid ammount then render error message.
   */
  ftmAmmountVerification(amount) {
    const { balance, selectedAccount, gasPrice } = this.props;
    const balanceCurrent = balance[selectedAccount.publicAddress];
    const maxFantomBalance = BigInt(balanceCurrent).minus(gasPrice);
    const valInEther = Web3.utils.fromWei(`${maxFantomBalance}`, 'ether');
    // const gasPriceEther = Web3.utils.fromWei(`${gasPrice}`, 'ether');
    // const maxFantomBalance = valInEther - gasPriceEther;
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(amount)) {
      return { status: false, message: 'Invalid Amount' };
    }
    if (amount > valInEther) {
      return { status: false, message: 'Insufficient Funds' };
    }

    return { status: true, message: '' };
  }

  /**
   * This method will check whether data filled is correct
   */
  async isTransferDataCorrect() {
    const { toAddress, ftmAmount, password, selectedAccount } = this.props;
    let isPasswordChecked = false;
    const transferDataPromise = new Promise(resolve => {
      const data = {
        verificationError: '',
        addressErrText: '',
        ammountErrText: '',
      };
      const isValidAddress = this.addressVerification(toAddress);
      const isValidAmount = this.ftmAmmountVerification(ftmAmount);
      const isPasswordCorrect = isAccountPasswordCorrect(selectedAccount, password);
      isPasswordCorrect
        .then(() => {
          isPasswordChecked = true;
          resolve(data);
        })
        .catch(err => {
          isPasswordChecked = true;
          data.verificationError = err.message;
          resolve(data);
        });
      if (selectedAccount.publicAddress === toAddress) {
        data.addressErrText = 'You can not send funds to yourself.';
      }
      if (!isValidAddress.status) {
        data.addressErrText = isValidAddress.message;
      }
      if (!isValidAmount.status) {
        data.ammountErrText = isValidAmount.message;
      }
      if (isPasswordChecked) {
        resolve(data);
      }
    });
    const data = await transferDataPromise;
    const hasError = Object.values(data).find(value => value !== '');
    if (hasError) {
      this.setState(data);
      return true;
    }
    return false;
  }

  /**
   * This method will check the status of the continue button
   */
  disableContinueButton() {
    const { toAddress, ftmAmount, password } = this.props;
    const data = {
      toAddress,
      ftmAmount,
      password,
    };
    let isValidAddress = true;
    if (toAddress !== '') {
      isValidAddress = this.addressVerification(toAddress);
    }

    const isAnyFieldEmpty = _.includes(data, '');
    const isAnyFieldUndefined = _.includes(data, undefined);
    const isPasswordIncorrect = _.includes(data, false);
    if (
      isAnyFieldEmpty ||
      isPasswordIncorrect ||
      isAnyFieldUndefined ||
      !isValidAddress ||
      !ftmAmount
    ) {
      return true;
    }

    return false;
  }

  /**
   * This method will return the amount error component that shows the error message
   */
  renderAmmountErrText() {
    const { ammountErrText } = this.state;
    if (ammountErrText && ammountErrText !== '') {
      return (
        <small className="form-element-hint" style={{ color: '#FF0000', paddingLeft: '10px' }}>
          {ammountErrText}
        </small>
      );
    }
    return null;
  }

  /**
   * This method will return the address error component that shows the error message
   */
  renderAddressErrText() {
    const { addressErrText, isValidAddress } = this.state;
    if (!isValidAddress && addressErrText && addressErrText !== '') {
      return (
        <small className="form-element-hint" style={{ color: '#FF0000', paddingLeft: '10px' }}>
          {addressErrText}
        </small>
      );
    }
    return null;
  }

  /**
   * This method will return the password error component that shows the error message
   */
  renderVerificationError() {
    const { verificationError } = this.state;
    if (verificationError && verificationError !== '') {
      return (
        <small className="form-element-hint" style={{ color: '#FF0000', paddingLeft: '10px' }}>
          {verificationError}
        </small>
      );
    }
    return null;
  }

  /**
   * This method will return loader component
   */
  renderLoader() {
    const { loading } = this.state;
    if (loading) {
      return (
        <div className="loader-holder">
          <Loader sizeUnit="px" size={25} color="#000" loading={loading} />
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      balance,
      toAddress,
      ftmAmount,
      optionalMessage,
      isValidAddress,
      password,
      loading,
      onUpdate,
      gasPrice,
      selectedAccount,
      setAccountType,
      refreshWalletDetail,
      isRefreshing,
    } = this.props;
    const isDisable = this.disableContinueButton();
    let rotate = '';
    if (isRefreshing) {
      rotate = 'rotate';
    }
    return (
      <div id="transaction-form">
        <div>
          <h2 className="text-white text-center text-uppercase heading">
            <span>Transfer</span>
          </h2>
          <div className="add-wallet">
            <h2 className="title">
              <span>Send Funds</span>
            </h2>
            <Button
              className="btn"
              onClick={() => refreshWalletDetail(selectedAccount.publicAddress)}
            >
              <i className={`fas fa-sync-alt ${rotate}`} />
            </Button>
          </div>
          <div className="form">
            <input type="email" name="email" className="hide-input" />
            <input type="password" name="password" className="hide-input" />
            <FormGroup>
              <Label for="to-address">To Address</Label>
              <div className={`success-check ${isValidAddress ? 'success' : ''}`}>
                {' '}
                {/* add or remove --- success --- class  */}
                <Input
                  type="text"
                  id="to-address"
                  placeholder="Enter Address"
                  autoComplete="text"
                  style={{
                    backgroundImage: `url(${addressImage})`,
                  }}
                  value={toAddress}
                  onChange={e => onUpdate('toAddress', e.currentTarget.value)}
                />
                {/* <img src={successCheck} alt={successCheck} /> */}
              </div>
              {this.renderAddressErrText()}
            </FormGroup>

            <FormGroup>
              <Label for="withdraw-from">Withdraw from</Label>
              <div className="withdraw-holder">
                <AccountList
                  selectedAccount={selectedAccount}
                  setAccountType={setAccountType}
                  balance={balance}
                  gasPrice={gasPrice}
                />
              </div>
            </FormGroup>
            <Row className="change">
              <Col>
                <FormGroup noValidate>
                  <Label for="Amount">Amount</Label>
                  <div className="input-holder">
                    <Input
                      type="text"
                      id="ftm-amount"
                      autoComplete="off"
                      style={{
                        backgroundImage: `url(${amountImage})`,
                      }}
                      value={ftmAmount}
                      onChange={e => onUpdate('ftmAmount', e.currentTarget.value)}
                    />
                  </div>
                  {this.renderAmmountErrText()}
                </FormGroup>
              </Col>
            </Row>
            <input type="email" name="email" className="hide-input" />
            <FormGroup>
              <Label for="to-address">Enter Password</Label>
              <div className="success-check">
                {' '}
                {/* add or remove --- success --- class  */}
                <Input
                  style={{
                    backgroundImage: `url(${passwordImage})`,
                  }}
                  type="password"
                  id="to-password"
                  autoCorrect="new-password"
                  placeholder="Password"
                  autoComplete="off"
                  value={password}
                  onChange={e => onUpdate('password', e.currentTarget.value)}
                />
                {/* <img src={successCheck} alt={successCheck} /> */}
              </div>
              {this.renderVerificationError()}
            </FormGroup>

            <Label for="OptionalMessage">Note</Label>
            <FormGroup className="mb-1">
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                placeholder="Optional Message"
                value={optionalMessage}
                onChange={e => onUpdate('optionalMessage', e.currentTarget.value)}
              />
            </FormGroup>
            <br />
            {!loading && (
              <center>
                <Button
                  color="primary"
                  disabled={isDisable}
                  className="text-uppercase bordered"
                  onClick={this.onConfirmSend}
                >
                  Continue
                </Button>
              </center>
            )}
            {this.renderLoader()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  balance: state.getBalance,
});

const mapDispatchToProps = dispatch => ({
  getBalance: data => dispatch(getFantomBalance(data)),
});

SendMoney.defaultProps = {
  loading: false,
};

SendMoney.propTypes = {
  balance: PropTypes.oneOfType([PropTypes.object]).isRequired,
  toAddress: PropTypes.string.isRequired,
  ftmAmount: PropTypes.string.isRequired,
  optionalMessage: PropTypes.string.isRequired,
  isValidAddress: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  gasPrice: PropTypes.number.isRequired,
  selectedAccount: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setAccountType: PropTypes.func.isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SendMoney);
