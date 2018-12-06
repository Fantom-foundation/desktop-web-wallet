import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import DropDown from './dropDown';
import { months } from '../../../redux/constants';
import { getTransactionsHistory } from '../../../redux/getTransactions/actions';

import received from './received.svg';
import send from './send.svg';

class TransactionHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 'all',
    };
    this.sortTransactions = this.sortTransactions.bind(this);
  }

  componentWillMount() {
    const { getTransactions, publicAddress } = this.props;
    getTransactions(publicAddress);
  }

  /**
   * This method will return the UI for transactions
   */
  getTransactionHistory() {
    const { transactions, publicAddress } = this.props;
    const { type } = this.state;
    const transactionsHistory = [];
    if (transactions && transactions.length > 0) {
      for (let i = 0; i < transactions.length; i += 1) {
        const date = moment(transactions[i].date).toDate();
        const isReceived = transactions[i].to === publicAddress && type === 'received';
        const isSend = transactions[i].from === publicAddress && type === 'sent';
        if (isReceived || isSend || type === 'all') {
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
                    <p>
                      <span>TX#</span> {transactions[i].txHash}
                    </p>
                    <p>
                      <span>From:</span> {transactions[i].from}
                    </p>
                  </div>
                </Col>
                <Col className="time-col">
                  <p>{moment(date).fromNow()}</p>
                </Col>
                <Col className="btn-col">
                  <Button color="green">
                    {transactions[i].amount} <span>FTM</span>
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }
      }
    }

    return transactionsHistory;
  }

  sortTransactions(type) {
    this.setState({
      type,
    });
  }

  render() {
    const transactionsHistory = this.getTransactionHistory();
    const { type } = this.state;
    return (
      <React.Fragment>
        <div className="bg-dark-light">
          <div className="add-wallet">
            <h2 className="title ">
              <span>Transactions</span>
            </h2>
            <DropDown sortTransactions={this.sortTransactions} type={type} />
          </div>
        </div>
        <div id="acc-cards" className="">
          <Row>
            <Col>
              {transactionsHistory.length > 0 ? (
                transactionsHistory
              ) : (
                <p className="no-history-text">No Transactions History</p>
              )}
            </Col>
          </Row>
        </div>
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
