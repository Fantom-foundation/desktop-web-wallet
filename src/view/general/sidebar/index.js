import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SendFunds from './send-funds/index';

import ConfirmFunds from './confirm-fund-transfer/index';
import { getPrivateKeyOfAddress } from '../../../redux/accountManagement';
import smallLogo from '../../../images/logo/FANTOM_LOGO_White.svg';

class SendMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmSend: false,
      address: '',
      publicKey: '',
      privateKey: '',
    };
    this.onConfirmSend = this.onConfirmSend.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.getPrivateKeyOfAddress = this.getPrivateKeyOfAddress.bind(this);
  }

  onConfirmSend(toAddress, publicAddress, password) {
    if (publicAddress !== '' && password !== '') {
      this.getPrivateKeyOfAddress(toAddress, publicAddress, password);
    }
  }

  /**
   * getPrivateKeyOfAddress() : This function is meant for getting private key.
   * @param {String} publicKey ,
   * @param {String} password ,
   */
  getPrivateKeyOfAddress(toAddress, publicKey, password) {
    getPrivateKeyOfAddress(publicKey, password)
      .then(res => {
        const hexPrivateKey = res.result;

        if (hexPrivateKey !== '') {
          this.setState({
            isConfirmSend: true,
            address: toAddress,
            publicKey,
            privateKey: hexPrivateKey,
          });
        }
        return true;
      })
      .catch(() => {
        this.setState({
          privateKey: '',
          isConfirmSend: false,
        });
      });
  }

  handleGoBack() {
    this.setState({
      isConfirmSend: false,
    });
  }

  renderScreen() {
    const {
      openTransferForm,
      transferMoney,
      gasPrice,
      isValidAddress,
      password,
      verificationError,
      toAddress,
      selectedAccount,
      ftmAmount,
      optionalMessage,
      onUpdate,
      setAccountType,
    } = this.props;
    const { isConfirmSend, address, publicKey, privateKey } = this.state;
    if (!isConfirmSend) {
      return (
        <SendFunds
          openTransferForm={openTransferForm}
          transferMoney={transferMoney}
          onConfirmSend={this.onConfirmSend}
          ftmAmount={ftmAmount}
          optionalMessage={optionalMessage}
          gasPrice={gasPrice}
          isValidAddress={isValidAddress}
          password={password}
          verificationError={verificationError}
          toAddress={toAddress}
          onUpdate={onUpdate}
          setAccountType={setAccountType}
          selectedAccount={selectedAccount}
        />
      );
    }
    return (
      <ConfirmFunds
        address={address}
        amount={ftmAmount}
        memo={optionalMessage || 'none'}
        publicKey={publicKey}
        privateKey={privateKey}
        transferMoney={transferMoney}
        openTransferForm={openTransferForm}
        handleGoBack={this.handleGoBack}
      />
    );
  }

  render() {
    const { openTransferForm, addClass } = this.props;
    return (
      <div id="coin-overley">
        <div className="background-overley" onClick={openTransferForm} role="presentation" />

        <div className={`${addClass} overley-body  bg-dark`}>
          <div className="main-header">
            <span className="close-btn text-white" onClick={openTransferForm} role="presentation">
              &times;
            </span>

            <img src={smallLogo} className="logo" alt="Fantom" />
          </div>
          <div className="main-body">{this.renderScreen()}</div>
        </div>
      </div>
    );
  }
}

SendMoney.propTypes = {
  openTransferForm: PropTypes.func.isRequired,
  transferMoney: PropTypes.func.isRequired,
};

export default SendMoney;
