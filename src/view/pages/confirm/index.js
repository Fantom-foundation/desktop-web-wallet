import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  createMnemonic,
  createAccount,
  incrementStepNo,
} from '../../../redux/accountInProgress/action';

class Confirm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="confirm" className="confirm">
        {/* <Layout> */}
        {/* <AccountProcess /> */}
        <section className="bg-dark">
          <Container>
            <Row>
              <Col className="px-0">
                <div className="add-wallet">
                  <h2 className="title ">
                    <span>Enter Your Mnemonic</span>
                  </h2>
                  <Button>
                    <i className="fas fa-print" />
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div id="mnemonic-selector">
                  <h2 className="text-white">Enter Your Mnemonic to create your account below</h2>
                  <Row className="bg-dark-light">
                    <Col>
                      <div className="mnemonic-container">
                        <ul>
                          <li>
                            <Button color="primary">Exile</Button>
                          </li>
                        </ul>
                      </div>
                      <div className="mnemonic-selector">
                        <ul>
                          <li>
                            <Button color="primary">Exile</Button>
                          </li>
                          <li className="selected">
                            <Button color="primary">Puzzle</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                        </ul>
                        <div className="mnemonic-btn">
                          <Button className="create-wallet">Create Wallet</Button>
                          <Button className="cancel">Cancel</Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* <section style={{ padding: '40px 0' }}>
          <Container>
            <Row className="back-next-btn">
              <Col className="text-right">
                <Button className="light">
                  <i className="fas fa-chevron-left" /> Back
                </Button>
              </Col>
              <Col>
                <Button

                // className={disableNextButton ? 'light' : ''}
                // onClick={disableNextButton ? () => true : this.createNewAccount}
                >
                  Create <i className="fas fa-chevron-right" />
                </Button>
              </Col>
            </Row>
          </Container>
        </section> */}
        {/* </Layout> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountInfo: state.accountInfo,
  stepNo: state.accountInfo.stepNo,
});

const mapDispatchToProps = dispatch => ({
  // setKeys: data => {
  //   dispatch(() => createPublicPrivateKeys(data));
  // },
  incrementStepNo: data => {
    dispatch(() => createAccount(data));
  },
  setMnemonicCode: data => {
    dispatch(() => createMnemonic(data));
  },
  goToStep: data => {
    dispatch(() => incrementStepNo(data));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Confirm);
