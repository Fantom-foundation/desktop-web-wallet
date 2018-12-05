import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ToastContainer, ToastStore } from 'react-toasts';
import { Container, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import copyToClipboard from '../../../utility';
import Layout from '../../components/layout';
import { getFantomBalance } from '../../../redux/getBalance/action';
import Identicons from '../../general/identicons/identicons';
import { sendRawTransaction } from '../../../redux/sendTransactions/action';
import { isAccountPasswordCorrect, transferMoneyViaFantom } from '../../../redux/accountManagement';
import TransactionHistory from './transactions';
import ShowPublicAddress from '../../components/public-address';

let interval = null;
class AccountDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    const { getBalance } = props;
    const publicAddress = this.getAccountPublicAddress();
    this.state = {
      isTransferringMoney: false,
    };
    this.transferMoney = this.transferMoney.bind(this);
    this.refreshBalance = this.refreshBalance.bind(this);
    // This will call the refresh the balance after every one second
    interval = setInterval(() => {
      getBalance(publicAddress);
    }, 1000);
  }

  componentWillMount() {
    const { getBalance } = this.props;
    const publicAddress = this.getAccountPublicAddress();
    getBalance(publicAddress);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  /**
   * This method will return the public address of the selected account
   */
  getAccountPublicAddress() {
    const { location, accountsList } = this.props;
    const { state } = location;
    const account = accountsList[state.selectedAccountIndex];

    return account.publicAddress;
  }

  /**
   * This method will refresh the balance
   */
  refreshBalance() {
    const { location, accountsList, getBalance } = this.props;
    const { state } = location;
    const account = accountsList[state.selectedAccountIndex];
    getBalance(account.publicAddress);
  }

  /**
   * This method will do the transaction functionality
   */
  transferMoney() {
    const { location, accountsList, transferMoney, getBalance } = this.props;
    this.setState({
      isTransferringMoney: true,
    });
    const isPasswordCorrect = Promise.resolve(isAccountPasswordCorrect(location, accountsList));
    isPasswordCorrect
      .then(() => {
        const isTransferredPromise = Promise.resolve(
          transferMoneyViaFantom(location, accountsList, transferMoney, getBalance)
        );
        isTransferredPromise
          .then(status => {
            ToastStore.info(`${status.message}`);
          })
          .catch(error => {
            ToastStore.info(`${error.message}`);
          });
        this.setState({
          isTransferringMoney: false,
        });
      })
      .catch(error => {
        this.setState({
          isTransferringMoney: false,
        });
        ToastStore.info(`${error.message}`);
      });
  }

  render() {
    const { accountsList, location, balance } = this.props;
    const { isTransferringMoney } = this.state;
    const { state } = location;
    const account = accountsList[state.selectedAccountIndex];
    return (
      <div id="account-datails" className="account-datails">
        <Layout>
          <section style={{ padding: '30px 0' }}>
            <Container className="bg-dark acc-details-container">
              <Row>
                <Col md={5} lg={4}>
                  <div className="bg-dark-light">
                    <div className="add-wallet">
                      <h2 className="title ">
                        <span>Account Management</span>
                      </h2>
                      <Button onClick={this.refreshBalance}>
                        <i className="fas fa-sync-alt" />
                      </Button>
                    </div>
                    <div id="acc-details">
                      <div className="text-center">
                        <span className="avatar">
                          <Identicons id={account.selectedIcon} width={40} size={3} />
                        </span>
                      </div>
                      <h2 className="acc-title text-primary">{account.accountName}</h2>
                      <ShowPublicAddress
                        copyToClipboard={copyToClipboard}
                        publicAddress={account.publicAddress}
                      />
                      <div className="info">
                        <p>Ledger testAccount</p>
                        <p>13 Outgoing transaction</p>
                      </div>
                      <div className="qr">
                        <QRCode
                          bgColor="black"
                          fgColor="white"
                          value={account.publicAddress}
                          level="H"
                          size={158}
                        />
                      </div>
                      <div className="ftm-no">
                        <p>
                          {balance} <span>FTM</span>
                        </p>
                      </div>
                      <center>
                        <Button
                          color="primary"
                          onClick={this.transferMoney}
                          disabled={isTransferringMoney}
                          className={isTransferringMoney ? 'bordered mt-3 light' : 'bordered mt-3'}
                        >
                          {isTransferringMoney ? 'Transferring....' : 'Transfer'}
                        </Button>
                      </center>
                    </div>
                  </div>
                </Col>
                <Col md={7} lg={8}>
                  <TransactionHistory publicAddress={account.publicAddress} />
                </Col>
              </Row>
            </Container>
            <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />
          </section>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountsList: state.accounts.accountsList,
  balance: state.getBalance.fantomBalance,
});

const mapDispatchToProps = dispatch => ({
  getBalance: data => dispatch(getFantomBalance(data)),
  transferMoney: data => dispatch(sendRawTransaction(data)),
});

AccountDetails.propTypes = {
  accountsList: PropTypes.oneOfType([PropTypes.array]).isRequired,
  balance: PropTypes.number.isRequired,
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
