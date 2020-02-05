import React, { useState } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import styles from './styles.module.scss';
import classnames from 'classnames';

export default ({
  label = '',
  lg = false,
  placeholder = '',
  value = '',
  type = 'text',
  rightLabel = '',
  handleChange,
  paste = false,
  error = { isError: false, errorText: '' },
  handleRightButton = () => {},
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
            {rightLabel !== '' && (
              <p onClick={handleRightButton} className={styles.entireBalance}>
                {rightLabel}
              </p>
            )}
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <Input
            className={classnames(
              styles.input,
              { [styles.lg]: lg },
              {
                [styles.error]: error.isError,
              }
            )}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={e => handleChange(e.target.value)}
            min="0"
          />
          {paste && (
            <button color="primary-main" className={styles.pasteButton}>
              Paste
            </button>
          )}
        </div>
      </FormGroup>
    </div>
  );
};
