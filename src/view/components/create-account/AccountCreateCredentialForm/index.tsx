import React, { FC, useState, useCallback } from 'react';
import { Col, Row, Container, Form, FormGroup, Input } from 'reactstrap';
import cross from '~/images/cross.svg';
import check from '~/images/check.svg';
import user from '~/images/user.svg';
import lock from '~/images/lock.svg';
import { CreateAccountButtons } from '~/view/components/create-account/CreateAccountButtons';
import { CreateAccountIcons } from '~/view/components/create-account/CreateAccountIcons';
import { IAccountState } from '~/redux/account';
import { Push } from 'connected-react-router';

type IProps = {
  push: Push;
  list: IAccountState['list'];
  onSubmit: (create: Partial<IAccountState['create']>) => void;
};

const INITIAL_ERRORS = {
  name: false,
  password: false,
  passwords_match: false,
  icon: false,
  unique: false,
};

const AccountCreateCredentialForm: FC<IProps> = ({ push, onSubmit, list }) => {
  const [name, setName] = useState('tezter2');
  const [password, setPassword] = useState('Tezter1234');
  const [password_again, setPasswordAgain] = useState('Tezter1234');
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
      unique: !!list && Object.values(list).some(el => el.name === name),
      passwords_match: !!password && password !== password_again,
      password: !password.match(/[A-Z]+/) || !password.match(/[0-9]+/) || password.length < 8,
      icon: !selected_icon,
    };

    if (Object.values(validation_errors).includes(true)) return setErrors(validation_errors);

    onSubmit({
      name,
      password,
      icon: selected_icon,
    });
  }, [onSubmit, name, password, password_again, selected_icon, list]);

  const onBackPressed = useCallback(() => push('/'), [push]);

  const is_long_enough = password.length > 8;
  const has_capital = password.match(/[A-Z]+/);
  const has_number = password.match(/[0-9]+/);

  return (
    <>
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

                  {errors.unique && (
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

                {!!errors.icon && <p style={{ color: 'red' }}>Please select an icon</p>}
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      <CreateAccountButtons onNextPressed={onNextPressed} onBackPressed={onBackPressed} />
    </>
  );
};

export { AccountCreateCredentialForm };
