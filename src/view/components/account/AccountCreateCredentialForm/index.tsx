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
  list: IAccountState['list'];
  onSubmit: (create: Partial<IAccountState['create']>) => void;
};

const INITIAL_ERRORS = {
  password: false,
  passwords_match: false,
  icon: false,
  unique: false,
};

const AccountCreateCredentialForm: FC<IProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [password_again, setPasswordAgain] = useState('');
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>(INITIAL_ERRORS);

  const onNextPressed = useCallback(() => {
    const validation_errors = {
      password_match: !!password && password !== password_again,
      password:
        !password.match(/[A-Z]+/) ||
        !password.match(/[0-9]+/) ||
        password.length < 8,
    };


    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);
    if (!checked) return;

    onSubmit({
      password,
    });
  }, [onSubmit, password, password_again, checked]);

  function handleCheckBox(toggle) {
    setChecked(toggle);
  }

  console.log('*****errors', errors);

  return (
    <>
      <div className={styles.createWalletWrap}>
        <CreateWalletCard>
          <div className={styles.title}>
            <h3 className="font-weight-semi-bold">
              1<span className="opacity-3 mr-3">/2</span> Create a keystore file
              and password{' '}
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
            handler={value => {
              setPassword(value);
              setErrors({ ...errors, password: false });
            }}
            isError={errors.password || false}
            errorMsg="Make sure to enter at least 8 characters, including one upper-case letter, a symbol and a number."
          />

          <Input
            type="password"
            label="Re-enter password"
            value={password_again}
            handler={value => {
              setPasswordAgain(value);
              setErrors({ ...errors, password_match: false });
            }}
            isError={errors.password_match}
            errorMsg={
              errors.password_match ? 'The entered password does not match' : ''
            }
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
              <br />I understand that{' '}
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
    </>
  );
};

export { AccountCreateCredentialForm };
