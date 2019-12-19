import React from 'react';
import { Card } from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';
import AddIcon from '../../../../images/icons/add.svg';

export default ({ address = '', balance = '', addNew = false }) => (
  <Card className={classnames({ [styles.addCard]: addNew }, 'h-100')}>
    {addNew ? (
      <div className="text-center">
        <h3 className="text-topaz font-weight-semi-bold mb-4">Add Wallet</h3>
        <button type="button" className={styles.addBtn}>
          <img src={AddIcon} alt="add" />
        </button>
      </div>
    ) : (
      <>
        <p className="card-label mb-0">Address</p>
        <h2 className={classnames(styles.value, 'mb-4')}>{address}</h2>
        <p className="card-label mb-0">Balance</p>
        <h2 className={styles.value}>{balance}</h2>
      </>
    )}
  </Card>
);
