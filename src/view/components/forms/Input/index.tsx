import React, { useState } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import styles from './styles.module.scss';
import PasswordShow from '../../../../images/icons/password-show.svg';
import PasswordHide from '../../../../images/icons/password-hide.svg';

const setValue = (e, handler) => {
  e.preventDefault();
  handler(e.target.value);
};

export default ({
  label = '',
  type = '',
  placeholder = '',
  value = '',
  handler,
}) => {
  const [showPassword, setPasswordChange] = useState(false);
  function handleButton(toggle) {
    setPasswordChange(toggle);
  }
  return (
    <div>
      <div className={styles.input}>
        <FormGroup>
          {label !== '' && <Label className={styles.label}>{label}</Label>}
          <div className={styles.inputWrapper}>
            <Input
              className={styles.inputBox}
              value={value}
              type={showPassword ? 'text' : type}
              placeholder={placeholder}
              onChange={e => setValue(e, handler)}
            />
            {type === 'password' && (
              <button
                className={styles.eyeIcon}
                onClick={() => handleButton(!showPassword)}
              >
                <img src={PasswordShow} />
              </button>
            )}
          </div>

          <p className={styles.warning || styles.error}>
            <i className="fas fa-info-circle mr-2" />
            <span>
              Make sure to enter at least 8 characters, including one upper-case
              letter, a symbol and a number.
            </span>
          </p>
        </FormGroup>
      </div>
    </div>
  );
};
