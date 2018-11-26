import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Layout from '../../components/layout';
import CreateAccountForm from '../../components/forms/create-account';
import AccountProcess from '../../components/account-process';

export default class CreateAccount extends React.PureComponent {
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
          <section className="bg-dark" style={{ padding: '80px 0' }}>
            <Container>
              <Row>
                <Col>
                  <CreateAccountForm />
                </Col>
              </Row>
            </Container>
          </section>
        </Layout>
      </div>
    );
  }
}
