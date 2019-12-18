import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import styles from './styles.module.scss';

export default ({ label = '' }) => (
  <div className={styles.input}>
    <FormGroup>
      {label !== '' && <Label className={styles.label}>{label}</Label>}
      <div className={styles.inputWrapper}>
        <Input className={styles.inputBox} />
        <button className={styles.eyeIcon}>
          <i className="fas fa-eye"></i>
        </button>
      </div>

      {/* <p className={styles.warning || styles.error}>
        <i className="fas fa-info-circle mr-2"></i>
        <span>
          Make sure to enter at least 8 characters, including one upper-case
          letter, a symbol and a number.
        </span>
      </p> */}
    </FormGroup>
  </div>
);
