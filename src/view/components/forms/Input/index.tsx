import React, { useState } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import styles from './styles.module.scss';
import PasswordShow from '../../../../images/icons/password-show.svg';
import PasswordHide from '../../../../images/icons/password-hide.svg';
import classnames from 'classnames';

const setValue = (e, handler) => {
  e.preventDefault();
  handler(e.target.value);
};

export default ({
  label = '',
  type = '',
  placeholder = '',
  value = '',
  noBorder = false,
  accessWallet = false,
  handler,
  isError,
  errorMsg,
}) => {
  const [showPassword, setPasswordChange] = useState(false);
  function handleButton(toggle) {
    setPasswordChange(toggle);
  }

  return (
    <div>
      <div className={styles.input}>
        <FormGroup className="position-relative">
          {label !== '' && <Label className={styles.label}>{label}</Label>}
          <div className={styles.inputWrapper}>
            <Input
              className={classnames(styles.inputBox, {
                [styles.errorInput]: isError && !noBorder,
                [styles.textLight]: accessWallet,
              })}
              value={value}
              type={showPassword ? 'text' : type}
              placeholder={placeholder}
              onChange={e => setValue(e, handler)}
            />
            {type === 'password' && (
              <button
                type="submit"
                className={styles.eyeIcon}
                onClick={() => handleButton(!showPassword)}
              >
                <img alt="" src={showPassword ? PasswordShow : PasswordHide} />
              </button>
            )}
          </div>
          <p
            className={classnames(styles.errorText, {
              [styles.warning]: !isError,
              [styles.accessWallet]: accessWallet,
            })}
          >
            {isError !== undefined && errorMsg !== '' && (
              <>{!accessWallet && <i className="fas fa-info-circle mr-2" />}</>
            )}
            <span>{errorMsg}</span>
          </p>
        </FormGroup>
      </div>
    </div>
  );
};
