import React from 'react';
import styles from './styles.module.scss';
import { Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';

export default ({ isOpen = false, toggle }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={styles.infoModal}
        centered
      >
        <ModalBody className={styles.modalBody}>
          <button
            type="button"
            className={classnames('btn-icon', styles.close)}
            onClick={toggle}
          >
            <i className="fas fa-times" />
          </button>
          <h2 className="text-center mb-4 pb-2">Supply balance</h2>
          <h4 className="mb-3">
            You can add value to the supply balance by activating the toggle
            switches next to the asset name in the section below.
          </h4>
          <h4 className="mb-3">
            By adding value to the supply balance, you increase your collateral
            position and contribute to the liquidity pool. Adding tokens to the
            liquidity pool earns you interests. The rates are indicated by the
            APR.
          </h4>
          <h4 className="mb-3">
            Earning represents the amount of interest generated so far.
          </h4>
          <h4 className="mb-3">
            You can also use the supply balance as a collateral to borrow
            tokens.
          </h4>
          <h4 className="mb-3">
            If you deposit additional tokens of an asset that you already added
            to the supply balance, they will be automatically added to the
            supply balance.
          </h4>
        </ModalBody>
      </Modal>
    </div>
  );
};
