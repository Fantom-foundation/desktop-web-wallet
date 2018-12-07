import React from 'react';
// import PropTypes from 'prop-types';
import { Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Web3 from 'web3';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _ from 'lodash';
import smallLogo from '../../../images/logo/fantom.png';
import addressImage from '../../../images/address.svg';
import amountImage from '../../../images/amount.svg';
import passwordImage from '../../../images/password.svg';
import { getFantomBalance } from '../../../redux/getBalance/action';
import Loader from '../loader';
import AccountList from '../../pages/account-details/accountList';
import { isAccountPasswordCorrect } from '../../../redux/accountManagement';

class SendMoney extends React.PureComponent {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    const { accountsList } = props;
    this.state = {
      address: '',
      // eslint-disable-next-line react/no-unused-state
      ftmAmount: '',
      optionalMessage: '',
      // accountStore: [],
      password: '',
      isValidAddress: false,
      selectedAccount: accountsList[0],
      // privateKey: '',
      // publicKey: '',
      loading: false,
      verificationError: '',
      gasPrice: 0x000000000001,
      addressErrText: '',
      ammountErrText: '',
      // toAddress: '',
    };
    this.onUpdate = this.onUpdate.bind(this);
    this.setAccountType = this.setAccountType.bind(this);
    this.disableContinueButton = this.disableContinueButton.bind(this);
    this.isTransferDataCorrect = this.isTransferDataCorrect.bind(this);
  }

  // componentWillReceiveProps(nextProps){
  //     const { storeKeys,  publicKey, accountName  } = nextProps;
  //     const userAccountStore = Store.store;
  //     const accountDetailList = [];
  //     for(const key of storeKeys){
  //         accountDetailList.push(userAccountStore[key]);
  //     }
  //     this.setState({
  //         accountStore: accountDetailList,
  //         publicKey,
  //         accountType: accountName,
  //     });
  // }

  // componentDidMount() {
  //   const { storeKeys, publicKey, accountName } = this.props;
  //   const userAccountStore = Store.store;
  //   const accountDetailList = [];
  //   for (const key of storeKeys) {
  //     accountDetailList.push(userAccountStore[key]);
  //   }
  //   this.setState({
  //     accountStore: accountDetailList,
  //     publicKey,
  //     accountType: accountName,
  //   });
  // }

  // setAddress(e) {
  //   const address = e.target.value.trim();
  //   this.setState({
  //     address,
  //   });
  //   this.addressVerification(address);
  // }

  // setFTMAmount(e) {
  //   const ftmAmount = e.target.value.trim();
  //   this.setState({
  //     ftmAmount,
  //   });
  //   this.ftmAmmountVerification(ftmAmount);
  // }

  onUpdate(key, value) {
    this.setState({
      [key]: value,
    });
  }

  /**
   * setAccountType() :  To set public key of selected account, and fetch balance for it.
   */

  setAccountType = (e, account) => {
    const { getBalance } = this.props;
    this.setState({
      selectedAccount: account,
    });
    getBalance(account.publicAddress);
  };

  // setMessage(e) {
  //   const optionalMessage = e.target.value;
  //   this.setState({
  //     optionalMessage,
  //   });
  // }

  /**
   * handleCheckSend() : User can transfer funds,
   *  only if all detail is filled and private key is retrived for public key and password in state.
   */

  // handleCheckSend() {
  //   const {
  //     password,
  //     publicKey,
  //     loading,
  //     addressErrText,
  //     ammountErrText,
  //     address,
  //     ftmAmount,
  //   } = this.state;
  //   if (
  //     loading ||
  //     addressErrText !== '' ||
  //     ammountErrText !== '' ||
  //     address === '' ||
  //     ftmAmount === '' ||
  //     Number(ftmAmount) <= 0 ||
  //     password === ''
  //   ) {
  //     return null;
  //   }
  //   const isValidDetail = this.handleSendMoney();
  //   if (isValidDetail) {
  //     setTimeout(() => {
  //       this.getPrivateKeyOfAddress(publicKey, password);
  //     }, 100);
  //   }
  // }

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
  // eslint-disable-next-line class-methods-use-this
  addressVerification(address) {
    if (!Web3.utils.isAddress(address)) {
      return { status: false, message: 'Invalid Address' };
    }
    return { status: true, message: '' };
  }

  /**
   * ftmAmmountVerification() : To check ammount entered is valid or not, if invalid ammount then render error message.
   */
  ftmAmmountVerification(ammount) {
    const { balance } = this.props;
    const { selectedAccount, gasPrice } = this.state;
    console.log(balance[selectedAccount.publicAddress], 'balance[selectedAccount.publicAddress]');
    const valInEther = Web3.utils.fromWei(`${balance[selectedAccount.publicAddress]}`, 'ether');
    const gasPriceEther = Web3.utils.fromWei(`${gasPrice}`, 'ether');
    const maxFantomBalance = valInEther - gasPriceEther;
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(ammount)) {
      return { status: false, message: 'Invalid Amount' };
    }
    if (ammount > maxFantomBalance) {
      return { status: false, message: 'Insufficient Funds' };
    }

    return { status: true, message: '' };
  }

  async isTransferDataCorrect() {
    const { transferMoney } = this.props;
    let isError = '';
    const { toAddress, ftmAmount, password, selectedAccount } = this.state;
    const isValidAddress = this.addressVerification(toAddress);
    const isValidAmount = this.ftmAmmountVerification(ftmAmount);
    const isPasswordCorrect = Promise.resolve(isAccountPasswordCorrect(selectedAccount, password));
    if (!isValidAddress.status) {
      isError = true;
      this.setState({
        addressErrText: isValidAddress.message,
      });
      return;
    }
    if (!isValidAmount.status) {
      isError = true;
      this.setState({
        ammountErrText: isValidAmount.message,
      });
      return;
    }
    isPasswordCorrect
      .then(result => {
        if (result.success) {
          this.setState({
            verificationError: '',
          });
        }
      })
      .catch(error => {
        if (error.error) {
          isError = true;
          this.setState({
            verificationError: error.message,
          });
        }
      });

    if (!isError) {
      transferMoney();
    }
  }

  disableContinueButton() {
    const { toAddress, ftmAmount, password } = this.state;
    const data = {
      toAddress,
      ftmAmount,
      password,
    };
    let isValidAddress = true;
    let isValidAmount = true;
    if (toAddress !== '') {
      isValidAddress = this.addressVerification(toAddress);
    }
    if (ftmAmount !== '') {
      isValidAmount = this.ftmAmmountVerification(ftmAmount);
    }

    const isAnyFieldEmpty = _.includes(data, '');
    const isAnyFieldUndefined = _.includes(data, undefined);
    const isPasswordIncorrect = _.includes(data, false);
    if (
      isAnyFieldEmpty ||
      isPasswordIncorrect ||
      isAnyFieldUndefined ||
      !isValidAddress ||
      !isValidAmount
    ) {
      return true;
    }

    return false;
  }

  renderAmmountErrText() {
    const { ammountErrText } = this.state;
    if (ammountErrText !== '') {
      return (
        <small className="form-element-hint" style={{ color: '#FF0000', paddingLeft: '10px' }}>
          {ammountErrText}
        </small>
      );
    }
    return null;
  }

  renderAddressErrText() {
    const { addressErrText, isValidAddress } = this.state;
    if (!isValidAddress && addressErrText !== '') {
      return (
        <small className="form-element-hint" style={{ color: '#FF0000', paddingLeft: '10px' }}>
          {addressErrText}
        </small>
      );
    }
    return null;
  }

  renderVerificationError() {
    const { verificationError } = this.state;
    if (verificationError !== '') {
      return (
        <small className="form-element-hint" style={{ color: '#FF0000', paddingLeft: '10px' }}>
          {verificationError}
        </small>
      );
    }
    return null;
  }

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
    const { openTransferForm, balance } = this.props;
    let maxFantomBalance = 0;
    const {
      toAddress,
      ftmAmount,
      optionalMessage,
      isValidAddress,
      password,
      loading,
      selectedAccount,
      gasPrice,
    } = this.state;
    const keys = Object.keys(balance);
    console.log(balance, 'balancebalance');
    if (balance && keys.length > 0) {
      console.log(balance[selectedAccount.publicAddress], 'balance[selectedAccount.publicAddress]');
      const valInEther = Web3.utils.fromWei(`${balance[selectedAccount.publicAddress]}`, 'ether');
      const gasPriceEther = Web3.utils.fromWei(`${gasPrice}`, 'ether');
      maxFantomBalance = valInEther - gasPriceEther;
      maxFantomBalance = Number(maxFantomBalance).toFixed(4);
    }
    const isDisable = this.disableContinueButton();
    return (
      <div id="coin-overley" className="">
        <div className="background-overley" onClick={openTransferForm} role="presentation" />

        <span className="close-btn text-white" onClick={openTransferForm} role="presentation">
          &times;
        </span>

        <div className="overley-body  bg-dark">
          <div className="main-header">
            <img src={smallLogo} className="logo" alt="Fantom" />
          </div>
          <div className="main-body">
            <div id="transaction-form">
              <div>
                <h2 className="text-white text-center text-uppercase heading">
                  <span>Transfer</span>
                </h2>
                <div className="add-wallet">
                  <h2 className="title">
                    <span>Send Funds</span>
                  </h2>
                  <Button className="btn">
                    <i className="fas fa-sync-alt" />
                  </Button>
                </div>
                <div className="form">
                  <FormGroup>
                    <Label for="to-address">To Address</Label>
                    <div className={`success-check ${isValidAddress ? 'success' : ''}`}>
                      {' '}
                      {/* add or remove --- success --- class  */}
                      <Input
                        type="text"
                        id="to-address"
                        placeholder="Enter Address"
                        style={{
                          backgroundImage: `url(${addressImage})`,
                        }}
                        value={toAddress}
                        onChange={e => this.onUpdate('toAddress', e.currentTarget.value)}
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
                        setAccountType={this.setAccountType}
                        maxFantomBalance={maxFantomBalance}
                      />
                    </div>
                  </FormGroup>
                  <Row className="change">
                    <Col>
                      <FormGroup>
                        <Label for="Amount">Amount</Label>
                        <div className="input-holder">
                          <Input
                            type="text"
                            id="to-address"
                            style={{
                              backgroundImage: `url(${amountImage})`,
                            }}
                            className="text-right"
                            value={ftmAmount}
                            onChange={e => this.onUpdate('ftmAmount', e.currentTarget.value)}
                          />
                        </div>
                        {this.renderAmmountErrText()}
                      </FormGroup>
                    </Col>
                  </Row>

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
                        placeholder="Password"
                        value={password}
                        onChange={e => this.onUpdate('password', e.currentTarget.value)}
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
                      onChange={e => this.onUpdate('optionalMessage', e.currentTarget.value)}
                    />
                  </FormGroup>
                  <br />
                  {!loading && (
                    <center>
                      <Button
                        // color={`${continueBtnColor}`}
                        color="primary"
                        disabled={isDisable}
                        className="text-uppercase bordered"
                        onClick={this.isTransferDataCorrect}
                      >
                        Continue
                      </Button>
                    </center>
                  )}

                  {/* <span
                    aria-hidden
                    className="pointer"
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '42px',
                      fontSize: '25px',
                      lineHeight: '55%',
                      fontWeight: 100,
                      fontFamily: 'Robotos',
                      color: '#8D9BAE',
                    }}
                    onClick={this.handleModalClose.bind(this)}
                  >
                    &times;
                  </span> */}
                  {this.renderLoader()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountsList: state.accounts.accountsList,
  balance: state.getBalance,
});

const mapDispatchToProps = dispatch => ({
  getBalance: data => dispatch(getFantomBalance(data)),
  // transferMoney: data => dispatch(sendRawTransaction(data)),
});

SendMoney.propTypes = {
  accountsList: PropTypes.oneOfType([PropTypes.array]).isRequired,
  balance: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getBalance: PropTypes.func.isRequired,
  openTransferForm: PropTypes.bool.isRequired,
  transferMoney: PropTypes.func.isRequired,
  // transferMoney: PropTypes.func.isRequired,
  // location: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SendMoney);
