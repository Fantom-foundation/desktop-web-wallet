import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import copy from 'copy-to-clipboard';
import { ToastContainer, ToastStore } from 'react-toasts';
import { Container, Row, Col, Button } from 'reactstrap';
import QRCode from 'qrcode.react';
import Layout from '../../components/layout';
import { getFantomBalance } from '../../../redux/getBalance/action';
import Identicons from '../../general/identicons/identicons';
import DropDown from './dropDown';
import { getTransactionsHistory } from '../../../redux/getTransactions/actions';
import { getFantomNonce, sendRawTransaction } from '../../../redux/sendTransactions/action';
import { isAccountPasswordCorrect, transferMoneyViaFantom } from '../../../redux/accountManagement';

class AccountDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isTransferringMoney: false,
    };
    this.transferMoney = this.transferMoney.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  componentWillMount() {
    const SELF = this;
    const { getBalance, getTransactions } = SELF.props;
    const publicAddress = this.getAccountPublicAddress();
    getBalance(publicAddress);
    getTransactions(publicAddress);
  }

  getAccountPublicAddress() {
    const SELF = this;
    const { location, accountsList } = SELF.props;
    const { state } = location;
    const account = accountsList[state.selectedAccountIndex];

    return account.publicAddress;
  }

  /**
   * This method will copy the text
   */
  // eslint-disable-next-line class-methods-use-this
  copyToClipboard(publicAddress) {
    copy(publicAddress);
    ToastStore.info('Copy to clipboard');
  }

  transferMoney() {
    const SELF = this;
    const { location, accountsList, transferMoney, getBalance } = SELF.props;
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
    const SELF = this;
    const { accountsList, location, balance } = SELF.props;
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
                      <Button>
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
                      <div className="account-no">
                        <p>
                          <span>
                            <button
                              type="button"
                              onClick={() => this.copyToClipboard(account.publicAddress)}
                              className="clipboard-btn"
                            >
                              <i className="fas fa-clone" />
                            </button>
                          </span>
                          {account.publicAddress}
                        </p>
                      </div>
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
                  <div className="bg-dark-light">
                    <div className="add-wallet">
                      <h2 className="title ">
                        <span>Transactions</span>
                      </h2>
                      {/* <Button> */}
                      <DropDown />
                      {/* </Button> */}
                    </div>
                  </div>
                  <div id="acc-cards" className="">
                    <Row>
                      <Col>
                        <div className="card bg-dark-light">
                          <Row className="">
                            <Col className="date-col">
                              <div>
                                <p>29</p>
                                <p>Nov</p>
                              </div>
                            </Col>
                            <Col className="acc-no-col">
                              <div className="">
                                <p>
                                  <span>TX#</span> 075868435934588gjtdrfh8tu4rut
                                </p>
                                <p>
                                  <span>From:</span> 075868435934588gjtdrfh8tu4rut
                                </p>
                              </div>
                            </Col>
                            <Col className="time-col">
                              <p>23 mins 41 secs ago</p>
                            </Col>
                            <Col className="btn-col">
                              <Button color="green">
                                2.10000000 <span>FTM</span>
                              </Button>
                            </Col>
                          </Row>
                        </div>

                        <div className=" card bg-dark-light">
                          <Row className="">
                            <Col className="date-col">
                              <div>
                                <p>29</p>
                                <p>Nov</p>
                              </div>
                            </Col>
                            <Col className="acc-no-col">
                              <div className="">
                                <p>
                                  <span>TX#</span> 075868435934588gjtdrfh8tu4rut
                                </p>
                                <p>
                                  <span>To:</span> 075868435934588gjtdrfh8tu4rut
                                </p>
                              </div>
                            </Col>
                            <Col className="time-col">
                              <p>23 mins 41 secs ago</p>
                            </Col>
                            <Col className="btn-col">
                              <Button color="red">
                                2.10000000 <span>FTM</span>
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
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
  nonce: state.sendTransactions.fantomNonce,
});

const mapDispatchToProps = dispatch => ({
  getBalance: data => dispatch(getFantomBalance(data)),
  getTransactions: data => dispatch(getTransactionsHistory(data)),
  getNonce: data => dispatch(getFantomNonce(data)),
  transferMoney: data => dispatch(sendRawTransaction(data)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountDetails);
