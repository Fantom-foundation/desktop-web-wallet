import React, { FC, useState, useCallback } from 'react';
import { IAccountState } from '~/redux/account';
import { Push } from 'connected-react-router';
import styles from './styles.module.scss';
import { CreateWalletCard } from '../../cards';
import { Input } from '../../forms';
import { useTranslation } from "react-i18next";
import {
  FormCheckedIcon,
  FormUnCheckedIcon,
} from 'src/view/components/svgIcons';
import classnames from 'classnames';


interface IProps {
  push: Push;
  list: IAccountState['list'];
  onSubmit: (create: Partial<IAccountState['create']>) => void;
  walletCardClassName?: string;
  title: string
};


const AccountCreateCredentialForm: FC<IProps> = ({
  onSubmit,
  walletCardClassName = '',
  title,
  push,
}) => {
  const [password, setPassword] = useState('');
  const [password_again, setPasswordAgain] = useState('');
  const [checked, setChecked] = useState(false);

const validatePassField = useCallback(() => {
  if( password !== '' && (!password.match(/[A-Z]+/) ||
  !password.match(/[\W]/) ||
  !password.match(/[0-9]+/) ||
  password.length < 8 || password.length > 200 )){
    return true
  }
  return false
}, [password])


const validateRePassField = useCallback(() => {
  if( !!password && !!password_again && password !== password_again){
    return true
  }
  return false
}, [password, password_again])

  const onNextPressed = useCallback(() => {
    if (!checked) return;

    onSubmit({
      password,
    });
  }, [password, checked, onSubmit]);

  function handleCheckBox(toggle) {
    setChecked(toggle);
  }

  const handleClose = () => {
    push('/')
  }
  const { t } = useTranslation();


  return (
    <CreateWalletCard className={walletCardClassName} handleClose={handleClose} title={title}>
      <div className={styles.title}>
        <h3 className="font-weight-semi-bold">
          1
          <span className="opacity-3 mr-2 mr-md-3">/2</span>
          {' '}
          {t("createKeystoreFilePassword")}
          {' '}         
        </h3>
      </div>
      <Input
        type="password"
        label={t("SetNewPassword")}
        value={password}
        handler={value => {
          setPassword(value);
        }}
        isError={validatePassField() || false}
        errorMsg={t("walletPasswordValidationText")}
      />

      <Input
        type="password"
        label={t("reEnterPassword")}
        value={password_again}
        handler={value => {
          setPasswordAgain(value);
        }}
        isError={validateRePassField()}
        errorMsg={
          validateRePassField() ? t("passwordDoesNotMatch") : ''
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
          {t("backupKeystoreFileText")}
.
          <br />
          {t("walletCreationT&C")}
        </p>
      </div>
      <div className={styles.downloadBtnWrapper}>
        <button
          type="button"
          className={classnames(styles.downloadBtn, {
            [styles.disable]: !checked,
          })}
          onClick={onNextPressed}
          disabled={!checked}
        >
          {t("downloadKeystoreFile")}
        </button>
      </div>
    </CreateWalletCard>
  );
};

export { AccountCreateCredentialForm };
