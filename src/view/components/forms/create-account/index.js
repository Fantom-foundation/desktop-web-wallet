import React from 'react';
import { Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import DisplayIdenticons from '../../../general/identicons';

export default class CreateAccount extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const SELF = this;
    const {
      accountName,
      onUpdate,
      password,
      reEnteredPassword,
      passwordHint,
      createNewAccount,
      date,
      animateRefreshIcon,
      identiconsId,
      onRefresh,
      getRadioIconData,
    } = SELF.props;
    return (
      <Form id="create-account-form">
        <FormGroup>
          <Input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={accountName}
            onChange={e => onUpdate('accountName', e.currentTarget.value)}
          />
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Input
                type="password"
                name="pass"
                placeholder="Enter Pass"
                value={password}
                onChange={e => onUpdate('password', e.currentTarget.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="name"
                placeholder="Re Enter Pass"
                value={reEnteredPassword}
                onChange={e => onUpdate('reEnteredPassword', e.currentTarget.value)}
              />
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
          <Input
            type="text"
            name="name"
            placeholder="Password Hint"
            value={passwordHint}
            onChange={e => onUpdate('passwordHint', e.currentTarget.value)}
          />
        </FormGroup>
        <DisplayIdenticons
          animateRefreshIcon={animateRefreshIcon}
          date={date}
          identiconsId={identiconsId}
          onRefresh={onRefresh}
          getRadioIconData={getRadioIconData}
        />
        <Button onClick={createNewAccount}>Create Account</Button>
      </Form>
    );
  }
}
