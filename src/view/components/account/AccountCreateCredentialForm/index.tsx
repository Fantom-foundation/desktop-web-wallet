import React, { FC, useState, useCallback } from "react";
import { Col, Row, Container, Form, FormGroup } from "reactstrap";
import cross from "~/images/cross.svg";
import check from "~/images/check.svg";
import user from "~/images/user.svg";
import lock from "~/images/lock.svg";
import { CreateAccountButtons } from "~/view/components/account/CreateAccountButtons";
import { CreateAccountIcons } from "~/view/components/account/CreateAccountIcons";
import { IAccountState } from "~/redux/account";
import { Push } from "connected-react-router";
import styles from "./styles.module.scss";
import { TextInput } from "../../inputs/TextInput";

type IProps = {
  push: Push;
  list: IAccountState["list"];
  onSubmit: (create: Partial<IAccountState["create"]>) => void;
};

const INITIAL_ERRORS = {
  name: false,
  password: false,
  passwords_match: false,
  icon: false,
  unique: false,
};

const AccountCreateCredentialForm: FC<IProps> = ({ push, onSubmit, list }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_again, setPasswordAgain] = useState("");
  const [date, setDate] = useState(new Date().getTime());
  const [errors, setErrors] = useState<Record<string, boolean>>(INITIAL_ERRORS);
  const [selected_icon, setSelectedIcon] = useState(`0${String(date)}`);

  const onDateChange = useCallback(() => {
    const new_date = new Date().getTime();
    setDate(new_date);
    setSelectedIcon(`0${new_date}`);
  }, [setDate]);

  const onNextPressed = useCallback(() => {
    const validation_errors = {
      name: name.length < 3,
      unique:
        !!list &&
        name.length > 0 &&
        Object.values(list).some(el => el.name && el.name === name),
      passwords_match: !!password && password !== password_again,
      password:
        !password.match(/[A-Z]+/) ||
        !password.match(/[0-9]+/) ||
        password.length < 8,
      icon: !selected_icon,
    };

    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);

    onSubmit({
      name,
      password,
      icon: selected_icon,
    });
  }, [onSubmit, name, password, password_again, selected_icon, list]);

  const onBackPressed = useCallback(() => push("/"), [push]);

  const is_long_enough = password.length > 8;
  const has_capital = password.match(/[A-Z]+/);
  const has_number = password.match(/[0-9]+/);

  return (
    <>
      <section className={styles.wrap}>
        <Container>
          <Row>
            <Col>
              <Form className={styles.form} autoComplete="off">
                <FormGroup>
                  <TextInput
                    placeholder="Enter Name"
                    handler={setName}
                    value={name}
                    icon={user}
                    autoComplete="off"
                    name="name"
                  />

                  {errors.name && (
                    <p className={styles.error} id="error_name_required">
                      Account Name is required
                    </p>
                  )}

                  {errors.unique && (
                    <p className={styles.error} id="error_name_exists">
                      Account Name already exists
                    </p>
                  )}
                </FormGroup>

                <Row>
                  <Col>
                    <FormGroup>
                      <TextInput
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        handler={setPassword}
                        icon={lock}
                        autoComplete="off"
                        name="password"
                      />

                      {!!errors.password && (
                        <p
                          className={styles.error}
                          id="error_password_required"
                        >
                          Valid password is required
                        </p>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <TextInput
                        type="password"
                        placeholder="Enter Password Again"
                        value={password_again}
                        handler={setPasswordAgain}
                        icon={lock}
                        autoComplete="new-password"
                        name="password_again"
                      />

                      {!!errors.passwords_match && (
                        <p
                          className={styles.error}
                          id="error_password_mismatch"
                        >
                          Passwords do not match
                        </p>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={4} lg={3}>
                    <div className={styles.validator}>
                      <div>
                        <img
                          src={is_long_enough ? check : cross}
                          alt="correct"
                          className="ico"
                        />
                        8+ Characters
                      </div>
                      <div>
                        <img
                          src={has_capital ? check : cross}
                          alt="correct"
                          className="ico"
                        />
                        1+ Upper Case Letter
                      </div>
                      <div>
                        <img
                          src={has_number ? check : cross}
                          alt="correct"
                          className="ico"
                        />
                        1+ Number
                      </div>
                    </div>
                  </Col>
                </Row>

                <CreateAccountIcons
                  date={date}
                  onSelect={setSelectedIcon}
                  onRefresh={onDateChange}
                  selected={selected_icon}
                />

                {!!errors.icon && (
                  <p className={styles.error}>Please select an icon</p>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      <CreateAccountButtons
        onNextPressed={onNextPressed}
        onBackPressed={onBackPressed}
      />
    </>
  );
};

export { AccountCreateCredentialForm };
