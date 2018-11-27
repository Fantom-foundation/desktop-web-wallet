import React from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import Layout from '../../components/layout';
import AccountProcess from '../../components/account-process';
import Identicons from '../../general/identicons/identicons';
import qrImg from '../../../images/qr/FantomQR.jpg';
import noView from '../../../images/icons/no-view.png';

const QR = () => (
  <>
    <img src={qrImg} className="w-100" alt="qr-img" />
  </>
);

export default class AccountInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="account-information" className="account-information">
        <Layout>
          <section style={{ padding: '90px 0' }}>
            <Container>
              <Row>
                <Col>
                  <AccountProcess />
                </Col>
              </Row>
            </Container>
          </section>
          <section className="bg-dark" style={{ padding: '40px 0 70px' }}>
            <Container>
              <Row className="acc-details bg-dark-light" style={{ marginBottom: '30px' }}>
                <Col>
                  <div className="acc-qr">
                    <QR />
                  </div>
                  <div className="acc-name-holder">
                    <Identicons id="01543302166156" width={50} size={3} />
                    <h2 className="acc-name">TestAccount</h2>
                  </div>
                  <h3 className="address">Your Address</h3>
                  <div className="account-no">
                    <p>
                      <span>
                        <i className="fas fa-clone" />
                      </span>
                      123fmjkdfg1262fkdcju4738jer584th45ut5j45r9tj459ot0r
                    </p>
                  </div>
                </Col>
                <Col className="qr-col">
                  <QR />
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col className="px-0">
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
              <Row className="bg-dark-light" style={{ padding: '90px 0' }}>
                <Col>
                  <Row style={{ padding: '0 0 90px' }}>
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
                  <Row>
                    <Col className="text-center no-capture">
                      <img src={noView} alt="no-view" />
                      <h2 className="text-danger">Screenshots are not secure</h2>
                      <p className="text-white mb-0">
                        If you take a screenshot, your backup may be viewed by other apps. You can
                        make a safe backup by writting down on a physical paper or print your
                        mnemonic passphrase.
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>

            <Container className="acc-footer">
              <Row>
                <Col>
                  <p className="text-white">
                    Please back up the recovery phase now. Make sure to keep it private and secure,
                    it allows full and unlimited access to your account and help you to restore your
                    wallet.
                  </p>
                  <FormGroup>
                    <Label for="msg" className="text-white">
                      Type{' '}
                      <span className="text-primary">
                        {'"'}I have written down the phrase{'"'}
                      </span>
                      below to confirm it is backed up.
                    </Label>
                    <div className="input-holder">
                      <Input type="text" name="msg" id="msg" autoFocus={false} />
                      <i className="fas fa-pencil-alt" />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </section>
          <section style={{ padding: '40px 0' }}>
            <Container>
              <Row className="back-next-btn">
                <Col className="text-right">
                  <Button className="light">
                    <i className="fas fa-chevron-left" /> Back
                  </Button>
                </Col>
                <Col>
                  <Button>
                    Next <i className="fas fa-chevron-right" />
                  </Button>
                </Col>
              </Row>
            </Container>
          </section>
        </Layout>
      </div>
    );
  }
}
