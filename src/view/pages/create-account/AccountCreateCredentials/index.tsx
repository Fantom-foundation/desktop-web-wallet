import React, { FC, useState, useCallback } from 'react';
import { Col, Row, Container, Form, FormGroup, Input } from 'reactstrap';
import AccountProcess from '~/view/components/account-process';
import Layout from '~/view/components/layout';
import cross from '~/images/cross.svg';
import check from '~/images/check.svg';
import user from '~/images/user.svg';
import lock from '~/images/lock.svg';
import { CreateAccountButtons } from '~/view/components/create-account/CreateAccountButtons';
import { CreateAccountIcons } from '~/view/components/create-account/CreateAccountIcons';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';

const mapStateToProps = selectAccountCreate;
const mapDispatchToProps = {
  accountCreateSetCredentials: ACCOUNT_ACTIONS.accountCreateSetCredentials,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {};

const INITIAL_ERRORS = { name: false, password: false, passwords_match: false, icon: false };

const AccountCreateCredentialsUnconnected: FC<IProps> = ({
  history,
  accountCreateSetCredentials,
}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password_again, setPasswordAgain] = useState('');
  const [date, setDate] = useState(new Date().getTime());
  const [errors, setErrors] = useState<Record<string, boolean>>(INITIAL_ERRORS);
  const [selected_icon, setSelectedIcon] = useState(`0${String(date)}`);

  const onNameChange = useCallback(event => setName(event.target.value), [setName]);
  const onPasswordChange = useCallback(event => setPassword(event.target.value), [setPassword]);
  const onPasswordAgainChange = useCallback(event => setPasswordAgain(event.target.value), [
    setPasswordAgain,
  ]);

  const onDateChange = useCallback(() => {
    const new_date = new Date().getTime();
    setDate(new_date);
    setSelectedIcon(`0${new_date}`);
  }, [setDate]);

  const onNextPressed = useCallback(() => {
    const validation_errors = {
      name: name.length < 3,
      passwords_match: !!password && password !== password_again,
      password: !password.match(/[A-Z]+/) || !password.match(/[0-9]+/) || password.length < 8,
      icon: !selected_icon,
    };

    if (Object.values(validation_errors).includes(true)) return setErrors(validation_errors);

    accountCreateSetCredentials({
      name,
      password,
      icon: selected_icon,
    });
  }, [accountCreateSetCredentials, name, password, password_again, selected_icon]);

  const onBackPressed = useCallback(() => history.push('/'), [history]);

  const is_long_enough = password.length > 8;
  const has_capital = password.match(/[A-Z]+/);
  const has_number = password.match(/[0-9]+/);

  const is_account_exists = false;

  return (
    <div id="account-information" className="account-information">
      <Layout>
        <AccountProcess restoreAccount={false} stepNo={1} />

        <section className="bg-dark" style={{ padding: '60px 0' }}>
          <Container>
            <Row>
              <Col>
                <Form id="create-account-form" autoComplete="off">
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      value={name}
                      onChange={onNameChange}
                      style={{ backgroundImage: `url(${user})` }}
                      autoComplete="off"
                    />

                    {errors.name && (
                      <p style={{ color: 'red', marginTop: '10px' }}>Account Name is required</p>
                    )}

                    {is_account_exists && (
                      <p style={{ color: 'red', marginTop: '10px' }}>Account Name already exists</p>
                    )}
                  </FormGroup>

                  <Row>
                    <Col>
                      <FormGroup>
                        <Input
                          type="password"
                          name="pass"
                          placeholder="Enter Password"
                          value={password}
                          onChange={onPasswordChange}
                          style={{ backgroundImage: `url(${lock})` }}
                          autoComplete="off"
                        />

                        {!!errors.password && (
                          <p style={{ color: 'red' }}>Valid password is required</p>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="password"
                          name="name"
                          placeholder="Re-enter Password"
                          value={password_again}
                          onChange={onPasswordAgainChange}
                          style={{ backgroundImage: `url(${lock})` }}
                          autoComplete="off"
                        />

                        {!!errors.passwords_match && (
                          <p style={{ color: 'red' }}>Passwords do not match</p>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md={4} lg={3}>
                      <ul className="pass-validator">
                        <li className="correct">
                          <img src={is_long_enough ? check : cross} alt="correct" className="ico" />
                          8+ Characters
                        </li>
                        <li className="correct">
                          <img src={has_capital ? check : cross} alt="correct" className="ico" />
                          1+ Upper Case Letter
                        </li>
                        <li className="correct">
                          <img src={has_number ? check : cross} alt="correct" className="ico" />
                          1+ Number
                        </li>
                      </ul>
                    </Col>
                  </Row>

                  <CreateAccountIcons
                    date={date}
                    onSelect={setSelectedIcon}
                    onRefresh={onDateChange}
                    selected={selected_icon}
                  />

                  {/* <DisplayIdenticons
                    animateRefreshIcon={false}
                    date={date}
                    identiconsId=""
                    selectedIcon={selected_icon}
                    onRefresh={onDateChange}
                    getRadioIconData={setSelectedIcon}
                  /> */}

                  {!!errors.icon && <p style={{ color: 'red' }}>Please select an icon</p>}
                </Form>
              </Col>
            </Row>
          </Container>
        </section>

        <CreateAccountButtons onNextPressed={onNextPressed} onBackPressed={onBackPressed} />
      </Layout>
    </div>
  );
};

const AccountCreateCredentials = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountCreateCredentialsUnconnected));

export { AccountCreateCredentials };
