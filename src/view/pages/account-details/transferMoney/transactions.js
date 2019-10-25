import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, Button } from 'reactstrap';
import Web3 from 'web3';
import _ from 'lodash';
import DropDown from '~/view/pages/account-details/dropDown';
import { ALL_TX, SENT_TX, RECEIVED_TX } from '~/redux/constants';
import { getTransactionsHistory } from '~/redux/getTransactions/actions';
import TxHashTooltip from '~/view/components/txnHashTooltip';
import HttpDataProvider from '~/utility/httpProvider';
import Loader from '~/view/general/loader';

class TransactionHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      txType: ALL_TX,
      transactions: [],
      isLoading: false,
    };
    this.filterTransaction = this.filterTransaction.bind(this);
    this.getNoTransactionsText = this.getNoTransactionsText.bind(this);
  }

  componentDidMount() {
    const { publicAddress } = this.props;
    this.setState({
      isLoading: true,
    });
    this.fetchTransactionList(publicAddress);

    this.txnInterval = setInterval(() => {
      this.fetchTransactionList(publicAddress);
    }, 4000);
  }

  // eslint-disable-next-line react/sort-comp
  fetchTransactionList(address) {
    // eslint-disable-next-line no-param-reassign
    HttpDataProvider.post('https://graphql.fantom.services/graphql?', {
      query: `
        {
          transactions(first: 100,from: "${address}", to: "${address}", byDirection: "desc") {
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
          if (res && res.data && res.data.data) {
            this.formatTransactionList(res.data.data);
          }
          this.setState({
            isLoading: false,
          });
          return null;
        },
        () => {
          console.log('1');
        }
      )
      .catch(err => {
        this.setState({
          isLoading: false,
        });
        console.log(err, 'err in graphql');
      });
  }

  formatTransactionList(data) {
    if (data && data.transactions && data.transactions.edges && data.transactions.edges.length) {
      const edgesArray = data.transactions.edges;
      const transactionArr = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const edge of edgesArray) {
        if (edge && edge.node) {
          transactionArr.push(edge.node);
        }
      }
      this.setState({ transactions: transactionArr });
    }
  }

  /**
   * This method will return the text depending upon the sorting type
   */
  getNoTransactionsText() {
    const { txType } = this.state;
    if (txType === SENT_TX) {
      return '(No sent transactions history)';
    }
    if (txType === RECEIVED_TX) {
      return '(No received transactions history)';
    }

    return '(Your recent transactions will be displayed here)';
  }

  /**
   * This method will return the UI for transactions
   */
  getTransactionHistory() {
    const { publicAddress, copyToClipboard } = this.props;
    const { transactions } = this.state;
    const { txType } = this.state;
    const text = this.getNoTransactionsText();

    const allTransaction = <p className="m-msg text-white  text-center mb-0">{text}</p>;

    const transactionsHistory = [];
    if (transactions && transactions.length > 0) {
      for (let i = 0; i < transactions.length; i += 1) {
        const isReceived =
          transactions[i].to === publicAddress && (txType === RECEIVED_TX || txType === ALL_TX);
        const isSend =
          transactions[i].from === publicAddress && (txType === SENT_TX || txType === ALL_TX);

        if (isReceived || isSend) {
          transactionsHistory.push(
            <div key={i} className="card bg-dark-light">
              <Row className="">
                <Col className="acc-no-col">
                  <div className="">
                    <TxHashTooltip
                      index={i}
                      hash={transactions[i].hash}
                      copyToClipboard={copyToClipboard}
                    />
                    <p>
                      <span>{isReceived ? 'From: ' : 'To: '}</span>
                      {isReceived ? transactions[i].from : transactions[i].to}
                    </p>
                  </div>
                </Col>

                <Col className="btn-col">
                  <Button color={`${isReceived ? 'green' : 'red'}`}>
                    {transactions[i].value
                      ? Web3.utils.fromWei(`${transactions[i].value}`, 'ether')
                      : '--'}
                    {' '}
                    <span>FTM</span>
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }
      }
    }

    if (transactionsHistory.length) {
      // reverse the transactions list, so that most recent one appears first
      _.reverse(transactionsHistory);
      return transactionsHistory;
    }

    return allTransaction;
  }

  /**
   * @param {Filter type} type
   * This method will filter the transactions depending upon the selected type
   */
  filterTransaction(type) {
    this.setState({
      txType: type,
    });
  }

  componentWillUnmount() {
    clearInterval(this.txnInterval);
  }

  renderLoader() {
    const { isLoading } = this.state;
    return (
      <div className="loader">
        <div className="loader-holder loader-center-align">
          <Loader sizeUnit="px" size={25} color="white" loading={isLoading} />
        </div>
      </div>
    );
  }

  render() {
    const { txType, isLoading } = this.state;
    const transactionsHistory = this.getTransactionHistory();
    return (
      <>
        <div className="bg-dark-light">
          <div className="add-wallet">
            <h2 className="title ">
              <span>Transactions</span>
            </h2>
            <DropDown filterTransaction={this.filterTransaction} txType={txType} />
          </div>
        </div>
        <div id="acc-cards">{isLoading ? this.renderLoader() : transactionsHistory}</div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.sendTransactions.transactions,
});

const mapDispatchToProps = dispatch => ({
  getTransactions: data => dispatch(getTransactionsHistory(data)),
});

// TransactionHistory.propTypes = {
//   getTransactions: PropTypes.func.isRequired,
//   publicAddress: PropTypes.string.isRequired,
//   transactions: PropTypes.oneOfType([PropTypes.array]).isRequired,
// };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TransactionHistory);
