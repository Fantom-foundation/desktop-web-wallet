import React from 'react';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';

import cross from './cross.svg';
import check from './check.svg';
import user from './user.svg';
import lock from './lock.svg';

export default class CreatAccount extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Form id="create-account-form">
        <FormGroup>
          <Input
            type="text"
            name="name"
            placeholder="Enter Name"
            style={{ backgroundImage: `url(${user})` }}
          />
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Input
                type="password"
                name="pass"
                placeholder="Enter Pass"
                style={{ backgroundImage: `url(${lock})` }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="name"
                placeholder="Re Enter Pass"
                style={{ backgroundImage: `url(${lock})` }}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3}>
            <ul className="pass-validator">
              <li className="correct">
                <img src={check} alt="correct" className="ico" />
                8+ Characters
              </li>
              <li className="false">
                <img src={cross} alt="invalid" className="ico" />
                1+ Capilital Letter
              </li>
              <li className="false">
                <img src={cross} alt="invalid" className="ico" />
                1+ Number
              </li>
            </ul>
          </Col>
        </Row>
        <FormGroup>
          <Input
            type="text"
            name="name"
            placeholder="Password Hint"
            style={{ backgroundImage: `url(${lock})` }}
          />
        </FormGroup>
      </Form>
    );
  }
}
