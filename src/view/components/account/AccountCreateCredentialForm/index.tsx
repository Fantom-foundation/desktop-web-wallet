import React, { FC, useState, useCallback } from 'react';
import { IAccountState } from '~/redux/account';
import { Push } from 'connected-react-router';
import styles from './styles.module.scss';
import { CreateWalletCard } from '../../cards';
import { Input } from '../../forms';
import {
  FormCheckedIcon,
  FormUnCheckedIcon,
} from 'src/view/components/svgIcons';
import classnames from 'classnames';

type IProps = {
  push: Push;
  list: IAccountState["list"];
  onSubmit: (create: Partial<IAccountState["create"]>) => void;
};

const INITIAL_ERRORS = {
  password: false,
  passwords_match: false,
  icon: false,
  unique: false,
};

const AccountCreateCredentialForm: FC<IProps> = ({ push, onSubmit, list }) => {
  // const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_again, setPasswordAgain] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>(INITIAL_ERRORS);


  const onNextPressed = useCallback(() => {
    const validation_errors = {
      // name: name.length < 3,
      // unique:
      //   !!list ,
      passwords_match: !!password && password !== password_again,
      password:
        !password.match(/[A-Z]+/) ||
        !password.match(/[0-9]+/) ||
        password.length < 8,
    };

    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);

    onSubmit({
      password,
    });
  }, [onSubmit, password, password_again]);

  const [checked, setChecked] = useState(false);
  function handleCheckBox(toggle) {
    setChecked(toggle);
  }

  console.log('****errors', errors)


  return (<>
    <div className={styles.createWalletWrap}>
      <CreateWalletCard>
        <div className={styles.title}>
          <h3 className="font-weight-semi-bold">
        1
            <span className="opacity-3 mr-3">/2</span>
            {' '}
              Create a keystore file
                and password
            {' '}
            <span className={styles.infoIcon}>
              <i className="fas fa-info-circle" />
              <div className={styles.tooltipWrapper}>
                <p className={styles.tooltip}>
              The keystore file will contain your encrypted private key.
                  <br />
              You’ll need the password to decrypt it. Don’t lose them!
                </p>
              </div>
            </span>
          </h3>
        </div>
        <Input
          type="password"
          label="Set a new password"
          value={password}
          handler={setPassword}
        />
        <Input
          type="password"
          label="Re-enter password"
          value={password_again}
          handler={setPasswordAgain}
        />
        <div className={styles.checkField}>
          <div className={styles.checkBoxWrapper}>
            <button
              type="button"
              className={styles.checkBox}
              onClick={() => handleCheckBox(!checked)}
            >
              {checked ? <FormCheckedIcon /> : <FormUnCheckedIcon />}
            </button>
          </div>
          <p>
        I made a backup of the keystore file and saved the password in a
        safe place.
            <br />
I understand that
            {' '}
            <a href="#" target="_blank">
          I will need the password and the keystore file to access my
          wallet.
            </a>
          </p>
        </div>
        <div className={styles.downloadBtnWrapper}>
          <button
            type="button"
            className={classnames(styles.downloadBtn, {
          [styles.disable]: !checked,
        })}
            onClick={onNextPressed}
          >
        Download keystore file
          </button>
        </div>
      </CreateWalletCard>
      {/* <MnemonicPhrase /> */}
    </div>
          </>)

  // return (
  //   <>
  //     <section className={styles.wrap}>
  //       <Container>
  //         <Row>
  //           <Col>
  //             <Form className={styles.form} autoComplete="off">
  //               <FormGroup>
  //                 {/* <TextInput
  //                   placeholder="Enter Name"
  //                   handler={setName}
  //                   value={name}
  //                   icon={user}
  //                   autoComplete="off"
  //                   name="name"
  //                 /> */}

  //                 {errors.name && (
  //                   <p className={styles.error} id="error_name_required">
  //                     Account Name is required
  //                   </p>
  //                 )}

  //                 {errors.unique && (
  //                   <p className={styles.error} id="error_name_exists">
  //                     Account Name already exists
  //                   </p>
  //                 )}
  //               </FormGroup>

  //               <Row>
  //                 <Col>
  //                   <FormGroup>
  //                     <TextInput
  //                       type="password"
  //                       placeholder="Enter Password"
  //                       value={password}
  //                       handler={setPassword}
  //                       icon={lock}
  //                       autoComplete="off"
  //                       name="password"
  //                     />

  //                     {!!errors.password && (
  //                       <p
  //                         className={styles.error}
  //                         id="error_password_required"
  //                       >
  //                         Valid password is required
  //                       </p>
  //                     )}
  //                   </FormGroup>

  //                   <FormGroup>
  //                     <TextInput
  //                       type="password"
  //                       placeholder="Enter Password Again"
  //                       value={password_again}
  //                       handler={setPasswordAgain}
  //                       icon={lock}
  //                       autoComplete="new-password"
  //                       name="password_again"
  //                     />

  //                     {!!errors.passwords_match && (
  //                       <p
  //                         className={styles.error}
  //                         id="error_password_mismatch"
  //                       >
  //                         Passwords do not match
  //                       </p>
  //                     )}
  //                   </FormGroup>
  //                 </Col>

  //                 <Col md={4} lg={3}>
  //                   <div className={styles.validator}>
  //                     <div>
  //                       <img src={is_long_enough ? getURL(check) : getURL(cross)} alt="correct" className="ico" />
  //                       8+ Characters
  //                     </div>
  //                     <div>
  //                       <img src={has_capital ? getURL(check) : getURL(cross)} alt="correct" className="ico" />
  //                       1+ Upper Case Letter
  //                     </div>
  //                     <div>
  //                       <img src={has_number ? getURL(check) : getURL(cross)} alt="correct" className="ico" />
  //                       1+ Number
  //                     </div>
  //                   </div>
  //                 </Col>
  //               </Row>

  //               <CreateAccountIcons
  //                 date={date}
  //                 onSelect={setSelectedIcon}
  //                 onRefresh={onDateChange}
  //                 selected={selected_icon}
  //               />

  //               {!!errors.icon && (
  //                 <p className={styles.error}>Please select an icon</p>
  //               )}
  //             </Form>
  //           </Col>
  //         </Row>
  //       </Container>
  //     </section>

  //     <CreateAccountButtons
  //       onNextPressed={onNextPressed}
  //       onBackPressed={onBackPressed}
  //     />
  //   </>
  // );
};

export { AccountCreateCredentialForm };
