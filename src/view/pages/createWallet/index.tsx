/* eslint-disable react/button-has-type */
import React, { FC, useState, useCallback } from 'react';
import { CreateWalletCard } from '../../components/cards';
import { Input } from '../../components/forms';
import {
  FormCheckedIcon,
  FormUnCheckedIcon,
} from 'src/view/components/svgIcons';
import { IAccountState } from '~/redux/account';
import { Push } from 'connected-react-router';
import styles from './styles.module.scss';
import MnemonicPhrase from './mnemonicPhrase';
import classnames from 'classnames';

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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password_again, setPasswordAgain] = useState('');
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
      //name: name.length < 3,
      // unique:
      //   !!list &&
      //   name.length > 0 &&
      //   Object.values(list).some(el => el.name && el.name === name),
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

  const onBackPressed = useCallback(() => push('/'), [push]);

  const is_long_enough = password.length > 8;
  const has_capital = password.match(/[A-Z]+/);
  const has_number = password.match(/[0-9]+/);
  const [checked, setChecked] = useState(false);
  function handleCheckBox(toggle) {
    setChecked(toggle);
  }
  return (
    <div className={styles.createWalletWrap}>
      <CreateWalletCard>
        <div className={styles.title}>
          <h3 className="font-weight-semi-bold">
            1<span className="opacity-3 mr-3">/2</span> Create a keystore file
            and password{' '}
            <span className={styles.infoIcon}>
              <i className="fas fa-info-circle"></i>
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
  );
};
export { AccountCreateCredentialForm };
