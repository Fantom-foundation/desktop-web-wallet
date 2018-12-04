import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import QRCode from 'qrcode.react';
import Layout from '../../components/layout';
import Identicons from '../../general/identicons/identicons';
import DropDown from './dropDown';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
                          <Identicons id="31543490683846" width={40} size={3} />
                        </span>
                      </div>
                      <h2 className="acc-title text-primary">Test Account</h2>
                      <div className="account-no">
                        <p>
                          <span>
                            <button type="button" className="clipboard-btn">
                              <i className="fas fa-clone" />
                            </button>
                          </span>
                          y675y796597y969hky0y6mkdjngjvdfnjgjnv45646
                        </p>
                      </div>
                      <div className="info">
                        <p>Ledger testAccount</p>
                        <p>13 Outgoing transaction</p>
                      </div>
                      <div className="qr">
                        <QRCode value="publicKey" level="H" size={158} />
                      </div>
                      <div className="ftm-no">
                        <p>
                          2.10000000 <span>FTM</span>
                        </p>
                      </div>
                      <center>
                        <Button color="primary" className="bordered mt-3">
                          Transfer
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
                      <Button>
                        <DropDown />
                      </Button>
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
          </section>
        </Layout>
      </div>
    );
  }
}

export default Home;
