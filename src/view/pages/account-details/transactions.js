import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, Button } from 'reactstrap';
import DropDown from './dropDown';
import { getTransactionsHistory } from '../../../redux/getTransactions/actions';

class TransactionHistory extends React.PureComponent {
  componentWillMount() {
    const SELF = this;
    const { getTransactions, publicAddress } = SELF.props;
    getTransactions(publicAddress);
  }

  render() {
    return (
      <React.Fragment>
        <div className="bg-dark-light">
          <div className="add-wallet">
            <h2 className="title ">
              <span>Transactions</span>
            </h2>
            <DropDown />
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
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTransactions: data => dispatch(getTransactionsHistory(data)),
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(TransactionHistory);
