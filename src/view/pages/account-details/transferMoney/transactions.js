import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import DropDown from '../dropDown';
import { months, ALL_TX, SENT_TX, RECEIVED_TX } from '../../../../redux/constants';
import { getTransactionsHistory } from '../../../../redux/getTransactions/actions';
import received from '../../../../images/received.svg';
import send from '../../../../images/send.svg';
import TxHashTooltip from '../../../components/txnHashTooltip';

class TransactionHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      txType: ALL_TX,
    };
    this.filterTransaction = this.filterTransaction.bind(this);
    this.getNoTransactionsText = this.getNoTransactionsText.bind(this);
  }

  componentWillMount() {
    const { getTransactions, publicAddress } = this.props;
    getTransactions(publicAddress);
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
    const { transactions, publicAddress, copyToClipboard } = this.props;
    const { txType } = this.state;
    const text = this.getNoTransactionsText();

    const allTransaction = <p className="m-msg text-white  text-center mb-0">{text}</p>;

    const transactionsHistory = [];
    if (transactions && transactions.length > 0) {
      for (let i = 0; i < transactions.length; i += 1) {
        const date = moment(transactions[i].date).toDate();

        const isReceived =
          transactions[i].to === publicAddress && (txType === RECEIVED_TX || txType === ALL_TX);
        const isSend =
          transactions[i].from === publicAddress && (txType === SENT_TX || txType === ALL_TX);

        if (isReceived || isSend) {
          transactionsHistory.push(
            <div key={i} className="card bg-dark-light">
              <Row className="">
                <Col className="date-col">
                  <div style={{ backgroundImage: `url(${isReceived ? received : send})` }}>
                    <p>{date.getDate()}</p>
                    <p>{months[date.getMonth()]}</p>
                  </div>
                </Col>
                <Col className="acc-no-col">
                  <div className="">
                    <TxHashTooltip
                      index={i}
                      hash={transactions[i].hexTx}
                      copyToClipboard={copyToClipboard}
                    />
                    {/* <p>
                      <span>TX#</span> {transactions[i].hexTx}
                    </p> */}
                    <p>
                      <span>{isReceived ? 'From: ' : 'To: '}</span>
                      {isReceived ? transactions[i].from : transactions[i].to}
                    </p>
                  </div>
                </Col>
                <Col className="time-col">
                  <p>{moment(date).fromNow()}</p>
                </Col>
                <Col className="btn-col">
                  <Button color={`${isReceived ? 'green' : 'red'}`}>
                    {transactions[i].amount} <span>FTM</span>
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

  render() {
    const { txType } = this.state;
    const transactionsHistory = this.getTransactionHistory();
    return (
      <React.Fragment>
        <div className="bg-dark-light">
          <div className="add-wallet">
            <h2 className="title ">
              <span>Transactions</span>
            </h2>
            <DropDown filterTransaction={this.filterTransaction} txType={txType} />
          </div>
        </div>
        <div id="acc-cards">{transactionsHistory}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.sendTransactions.transactions,
});

const mapDispatchToProps = dispatch => ({
  getTransactions: data => dispatch(getTransactionsHistory(data)),
});

TransactionHistory.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  publicAddress: PropTypes.string.isRequired,
  transactions: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TransactionHistory);
