import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Layout from '../../components/layout';
import avatar from '../../../images/icons/icon.png';

export default class AccountManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="account-management" className="account-management">
        <Layout>
          <section className="page-title">
            <Container>
              <Row>
                <Col>
                  <h2 className="title text-white text-center text-uppercase m-0">
                    <span>Account Management</span>
                  </h2>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="bg-dark" style={{ padding: '0 0 120px' }}>
            <Container className="account-card-container">
              <Row style={{ marginBottom: '90px' }}>
                <Col>
                  <div className="add-wallet">
                    <h2 className="title ">
                      <span>Accounts</span>
                    </h2>
                    <Button>
                      <i className="fas fa-plus" />
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row id="account-card" className="text-center ">
                <Col md={6} lg={3} className="main-col">
                  <div className="accounts-holder">
                    <div className="avatar">
                      <span className="avatar-icon">
                        <img src={avatar} alt="TestAccount" />
                      </span>
                    </div>
                    <h2 className="title ">
                      <span>TestAccount</span>
                    </h2>
                    <div className="account-no">
                      <p>
                        <span>
                          <i className="fas fa-clone" />
                        </span>
                        gfvgv
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={6} lg={3} className="main-col">
                  <div className="accounts-holder">
                    <div className="avatar">
                      <span className="avatar-icon">
                        <img src={avatar} alt="TestAccount" />
                      </span>
                    </div>
                    <h2 className="title ">
                      <span>TestAccount</span>
                    </h2>
                    <div className="account-no">
                      <p>
                        <span>
                          <i className="fas fa-clone" />
                        </span>
                        123fmjkdfg1262
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={6} lg={3} className="main-col">
                  <div className="accounts-holder">
                    <div className="avatar">
                      <span className="avatar-icon">
                        <img src={avatar} alt="TestAccount" />
                      </span>
                    </div>
                    <h2 className="title ">
                      <span>TestAccount</span>
                    </h2>
                    <div className="account-no">
                      <p>
                        <span>
                          <i className="fas fa-clone" />
                        </span>
                        123fmjkdfg1262fgnncdbtrgtrgtngjfjhuvfdfgdgfghf
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={6} lg={3} className="main-col">
                  <div className="accounts-holder">
                    <div className="avatar">
                      <span className="avatar-icon">
                        <img src={avatar} alt="TestAccount" />
                      </span>
                    </div>
                    <h2 className="title ">
                      <span>TestAccount</span>
                    </h2>
                    <div className="account-no">
                      <p>
                        <span>
                          <i className="fas fa-clone" />
                        </span>
                        gfvgv
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={6} lg={3} className="main-col">
                  <div className="accounts-holder">
                    <div className="avatar">
                      <span className="avatar-icon">
                        <img src={avatar} alt="TestAccount" />
                      </span>
                    </div>
                    <h2 className="title ">
                      <span>TestAccount</span>
                    </h2>
                    <div className="account-no">
                      <p>
                        <span>
                          <i className="fas fa-clone" />
                        </span>
                        gfvgv
                      </p>
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
