import React from 'react';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';

export default class CreatAccount extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Form id="create-account-form">
        <FormGroup>
          <Input type="text" name="name" placeholder="Enter Name" />
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Input type="password" name="pass" placeholder="Enter Pass" />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="name" placeholder="Re Enter Pass" />
            </FormGroup>
          </Col>
          <Col sm={3}>
            <div>
              <ul>
                <li className="correct">8+ Characters</li>
                <li className="false">1+ Capilital Letter</li>
                <li className="false">1+ Number</li>
              </ul>
            </div>
          </Col>
        </Row>
        <FormGroup>
          <Input type="text" name="name" placeholder="Password Hint" />
        </FormGroup>
      </Form>
    );
  }
}
