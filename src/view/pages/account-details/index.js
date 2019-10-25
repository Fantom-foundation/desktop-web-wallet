/* eslint-disable no-console */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer, ToastStore } from 'react-toasts';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import QRCode from '~/view/general/qr/index';
import copyToClipboard from '~/utility';
import Layout from '~/view/components/layout';
import { getFantomBalance } from '~/redux/getBalance/action';
import Identicons from '~/view/general/identicons/identicons';
import { sendRawTransaction } from '~/redux/sendTransactions/action';
import TransactionHistory from '~/view/pages/account-details/transferMoney/transactions';
import ShowPublicAddress from '~/view/components/public-address';
import SendMoney from '~/view/general/sidebar/index';
import HttpDataProvider from '~/utility/httpProvider';
import TransactionStatusModal from '~/view/components/modals/transaction-status-modal/index';
import ValidationMethods from '~/validations/userInputMethods';

const validationMethods = new ValidationMethods();

let interval = null;
class AccountDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    const { accountsList, getBalance } = props;
    const publicAddress = this.getAccountPublicAddress();
    let selectedAccount;
    if (publicAddress && publicAddress !== '') {
      const selectedAccounts = _.filter(
        accountsList,
        account => account.publicAddress === publicAddress
      );
      if (selectedAccounts && selectedAccounts.length && selectedAccounts.length > 0) {
        [selectedAccount] = selectedAccounts;
      }
    }

    this.state = {
      isTransferringMoney: false,
      ftmAmount: '',
      optionalMessage: '',
      gasPrice: 0x000000000001,
      isValidAddress: false,
      password: '',
      verificationError: '',
      selectedAccount,
      isCheckSend: false,
      openTxnStatusModal: false,
      statusTextBody: '',
      toAddress: '',
      addClass: '',
      currentAccount: selectedAccount,
      publicAddress,
      refreshBtnAnimation: false,
      isRefreshing: false,
    };
    this.setAccountType = this.setAccountType.bind(this);
    this.refreshBalance = this.refreshBalance.bind(this);
    this.openTransferForm = this.openTransferForm.bind(this);
    this.toggleTxnStatusModal = this.toggleTxnStatusModal.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.transferMoney = this.transferMoney.bind(this);
    // This will call the refresh the balance after every one second
    interval = setInterval(() => {
      getBalance(publicAddress);
    }, 5000);
  }

  componentDidMount() {
    this.fetchTransactionList();

    const { getBalance } = this.props;
    const publicAddress = this.getAccountPublicAddress();
    if (publicAddress && publicAddress !== '') {
      getBalance(publicAddress);
    }
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  /**
   * @param {Key to update} key
   * @param {Value entered} value
   * This method will set the state variables with the passed value
   */
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

  /**
   * This method will return the public address of the selected account
   */
  getAccountPublicAddress() {
    const { location, accountsList } = this.props;
    const { state } = location;
    if (state && accountsList && accountsList.length && accountsList.length > 0) {
      const account = accountsList[state.selectedAccountIndex];

      return account.publicAddress;
    }

    return null;
  }

  /**
   * This method will give the all transactions transferred from the given from address
   */
  fetchTransactionList() {
    HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
      query: `
        {
            transactions(from: "0xfd9ab87ecedc912a63f5b8fa3b8d7667d33fd981") {
              pageInfo {
              hasNextPage
            }
            edges {
              cursor
              node {
                hash
                from
                to
                block
                value
              }
            }
          }
        }`,
    })
      .then(
        res => {
          console.log(res, 'graphql');
          if (res && res.data) {
            console.log(res);
          }
          return null;
        },
        () => {
          console.log('1');
        }
      )
      .catch(err => {
        console.log(err, 'err in graphql');
      });
  }

  /**
   * This method will refresh the balance
   */
  refreshBalance() {
    const { location, accountsList, getBalance } = this.props;
    this.setState({
      refreshBtnAnimation: true,
    });

    setTimeout(() => {
      this.setState({
        refreshBtnAnimation: false,
      });
    }, 1000);
    const { state } = location;
    const account = accountsList[state.selectedAccountIndex];
    getBalance(account.publicAddress);
  }

  /**
   * This method will add the closing alider transition and closed the transfer slider
   */
  openTransferForm() {
    const { isCheckSend, currentAccount } = this.state;
    this.setState({
      addClass: 'closing',
    });
    setTimeout(() => {
      this.setState({
        isCheckSend: !isCheckSend,
        ftmAmount: '',
        optionalMessage: '',
        toAddress: '',
        selectedAccount: currentAccount,
        password: '',
        addClass: '',
      });
    }, 400);
  }

  /**
   * This method will toggle the Transaction Status modal
   */
  toggleTxnStatusModal() {
    this.setState({
      openTxnStatusModal: false,
      statusTextBody: '',
    });
  }

  transferMoney(data) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.transferMoney(data).then(response => {
      const { getBalance } = this.props;
      const { publicAddress } = this.state;
      getBalance(publicAddress);
      console.log(response, 'response');
      if (response && response.payload && response.payload.status < 400) {
        this.setState({
          openTxnStatusModal: true,
          statusTextBody: 'Funds transfered successfully.',
        });
      } else {
        this.setState({
          openTxnStatusModal: true,
          statusTextBody: 'Error in funds transfer.',
        });
      }
    });
  }

  refreshWalletBalance(address) {
    const { getBalance } = this.props;
    getBalance(address);
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 2000);
  }

  render() {
    const { publicAddress, refreshBtnAnimation } = this.state;
    if (!publicAddress || publicAddress === '') {
      return <Redirect to="/" />;
    }
    const { accountsList, location, balanceInfo } = this.props;
    const {
      isTransferringMoney,
      isCheckSend,
      openTxnStatusModal,
      statusTextBody,
      ftmAmount,
      selectedAccount,
      optionalMessage,
      gasPrice,
      isValidAddress,
      password,
      verificationError,
      toAddress,
      addClass,
      isRefreshing,
    } = this.state;
    const { state } = location;
    const account = accountsList[state.selectedAccountIndex];
    let valInEther = balanceInfo[account.publicAddress];
    if (valInEther) {
      valInEther = validationMethods.getFormattedBalances(valInEther, gasPrice);
    }

    let rotate = '';
    if (refreshBtnAnimation) {
      rotate = 'rotate';
    }
    return (
      <div id="account-datails" className="account-datails">
        <Layout className={`${isCheckSend && 'blur'}`}>
          <section style={{ padding: '30px 0' }}>
            <Container className="bg-dark acc-details-container">
              <Row>
                <Col md={12} lg={4} className="mb-4 mb-lg-0">
                  <div className="bg-dark-light">
                    <div className="add-wallet">
                      <h2 className="title ">
                        <span>Account Management</span>
                      </h2>
                      <Button onClick={this.refreshBalance}>
                        <i className={`fas fa-sync-alt ${rotate}`} />
                      </Button>
                    </div>
                    <div id="acc-details">
                      <div className="avatar-container">
                        <span className="avatar">
                          <Identicons id={account.selectedIcon} width={40} size={3} />
                        </span>
                      </div>
                      <h2 className="acc-title text-primary">{account.accountName}</h2>
                      <ShowPublicAddress
                        copyToClipboard={copyToClipboard}
                        publicAddress={account.publicAddress}
                      />
                      {/* <div className="info">
                        <p>Ledger testAccount</p>
                        <p>{transactions.length} Outgoing transaction</p>
                      </div> */}
                      <div className="qr">
                        <QRCode bgColor="white" fgColor="black" address={account.publicAddress} />
                      </div>
                      <div className="ftm-no">
                        <p>
                          {valInEther ? valInEther.balance : 0} 
                          {' '}
                          <span>FTM</span>
                        </p>
                      </div>
                      <center>
                        <Button
                          color="primary"
                          onClick={this.openTransferForm}
                          disabled={isTransferringMoney}
                          className={isTransferringMoney ? 'bordered mt-3 light' : 'bordered mt-3'}
                        >
                          {isTransferringMoney ? 'Transferring....' : 'Transfer'}
                        </Button>
                      </center>
                    </div>
                  </div>
                </Col>
                <Col md={12} lg={8}>
                  <TransactionHistory
                    publicAddress={account.publicAddress}
                    copyToClipboard={copyToClipboard}
                  />
                </Col>
              </Row>
            </Container>
            <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />

            <TransactionStatusModal
              openTxnStatusModal={openTxnStatusModal}
              toggleTxnStatusModal={this.toggleTxnStatusModal}
              statusTextHeader="Transfer Status"
              statusTextBody={statusTextBody}
            />
          </section>
        </Layout>

        {isCheckSend && (
          <SendMoney
            openTransferForm={this.openTransferForm}
            transferMoney={this.transferMoney}
            ftmAmount={ftmAmount}
            optionalMessage={optionalMessage}
            gasPrice={gasPrice}
            isValidAddress={isValidAddress}
            password={password}
            verificationError={verificationError}
            toAddress={toAddress}
            onUpdate={this.onUpdate}
            setAccountType={this.setAccountType}
            selectedAccount={selectedAccount}
            addClass={addClass}
            refreshWalletDetail={address => this.refreshWalletBalance(address)}
            isRefreshing={isRefreshing}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountsList: state.accounts.accountsList,
  balanceInfo: state.getBalance,
});

const mapDispatchToProps = dispatch => ({
  getBalance: data => dispatch(getFantomBalance(data)),
  transferMoney: data => dispatch(sendRawTransaction(data)),
});

AccountDetails.defaultTypes = {
  balanceInfo: 0,
};

AccountDetails.propTypes = {
  accountsList: PropTypes.oneOfType([PropTypes.array]).isRequired,
  balanceInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getBalance: PropTypes.func.isRequired,
  transferMoney: PropTypes.func.isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountDetails);
