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
        <section className="bg-dark">
          <Container>
            <Row>
              <Col className="px-0">
                <div className="add-wallet">
                  <h2 className="title ">
                    <span>Enter Your Mnemonic</span>
                  </h2>
                  <Button>
                    <i className="fas fa-sync-alt" />
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

                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
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
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                          <li>
                            <Button color="primary">Bomb</Button>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                  <div className="mnemonic-btn">
                    <Button className="create-wallet">Create Wallet</Button>
                    <Button className="cancel">Cancel</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
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
