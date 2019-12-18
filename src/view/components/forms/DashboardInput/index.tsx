import React, { useState } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import styles from './styles.module.scss';
import classnames from 'classnames';

export default ({
  label = '',
  placeholder = '',
  value = '',
  error = { isError: false, errorText: '' },
}) => {
  return (
    <div
      className={classnames(styles.inputContainer, {
        [styles.error]: error.isError,
      })}
    >
      <FormGroup>
        <div className={styles.labelWrapper}>
          {label !== '' && <Label className={styles.label}>{label}</Label>}
          <div className={styles.labelSubText}>
            {error.isError && (
              <p className={classnames({ [styles.errorText]: error })}>
                {error.errorText}
              </p>
            )}
            {label === 'Amount' && (
              <p className={styles.entireBalance}>Entire balance</p>
            )}
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <Input
            className={classnames(styles.input, {
              [styles.error]: error.isError,
            })}
            value={value}
            type="text"
            placeholder={placeholder}
          />
        </div>
      </FormGroup>
    </div>
  );
};
