import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Layout from '../../components/layout';

export default class AccountInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="account-information" className="account-information">
        <Layout>
          <section className="page-title">
            <Container>
              <Row>
                <Col>
                  <h2 className="title text-white text-center text-uppercase m-0">
                    <span>Account Information</span>
                  </h2>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="bg-dark" style={{ padding: '70px 0' }}>
            <Container className="">
              <Row style={{ marginBottom: '90px' }}>
                <Col>
                  <div className="add-wallet">
                    <h2 className="title ">
                      <span>Owner Recovery Phrase</span>
                    </h2>
                    <Button>
                      <i className="fas fa-print" />
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div id="mnemonic-collector">
                    <ul className="blur">
                      <li>Exile</li>
                      <li>Puzzle</li>
                      <li>Bomb</li>
                      <li>Picnic</li>
                      <li>Huge</li>
                      <li>Bulb</li>
                      <li>You</li>
                      <li>Cause</li>
                      <li>Salt</li>
                      <li>Emotions</li>
                      <li>Noise</li>
                      <li>Dish</li>
                    </ul>
                    <div className="blur-overley">
                      <div className="holder">
                        <h2>Click Here To Reveal Secret Words</h2>
                      </div>
                    </div>
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
