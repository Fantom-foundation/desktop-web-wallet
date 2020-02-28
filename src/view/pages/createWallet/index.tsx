/* eslint-disable jsx-a11y/anchor-is-valid */
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
import classnames from 'classnames';

type IProps = {
  push: Push;
  list: IAccountState['list'];
  onSubmit: (create: Partial<IAccountState['create']>) => void;
};


const AccountCreateCredentialForm: FC<IProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [password_again, setPasswordAgain] = useState('');

  const onNextPressed = useCallback(() => {
    
    onSubmit({
      password,
      icon: "",
    });
  }, [onSubmit, password]);


  const [checked, setChecked] = useState(false);
  function handleCheckBox(toggle) {
    setChecked(toggle);
  }

  return (
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
          isError
          errorMsg=""
        />
        <Input
          type="password"
          label="Re-enter password"
          value={password_again}
          handler={setPasswordAgain}
          isError
          errorMsg=""
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
            className={classnames(styles.downloadBtn, {
              [styles.disable]: !checked,
            })}
            onClick={onNextPressed}
            disabled={!checked}
          >
            Download keystore file
          </button>
        </div>
      </CreateWalletCard>
    </div>
  );
};
export { AccountCreateCredentialForm };
