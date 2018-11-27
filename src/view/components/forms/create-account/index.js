import React from 'react';
import { Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import DisplayIdenticons from '../../../general/identicons';
import cross from './cross.svg';
import check from './check.svg';
import user from './user.svg';
import lock from './lock.svg';

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
                value={password}
                onChange={e => onUpdate('password', e.currentTarget.value)}
                style={{ backgroundImage: `url(${lock})` }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="name"
                placeholder="Re Enter Pass"
                value={reEnteredPassword}
                onChange={e => onUpdate('reEnteredPassword', e.currentTarget.value)}
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
            value={passwordHint}
            onChange={e => onUpdate('passwordHint', e.currentTarget.value)}
            style={{ backgroundImage: `url(${lock})` }}
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
