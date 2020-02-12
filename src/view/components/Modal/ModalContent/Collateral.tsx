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
          <h2 className="text-center mb-4 pb-2">Collateral</h2>
          <h4 className="mb-3">
            The tokens you add to the supply balance act as a collateral to the
            loans.
          </h4>
          <h4 className="mb-3">
            <u>The minimum collateral ratio is 100%. </u>This means that if you
            added 100 fUSD worth of tokens to the supply balance, you can borrow
            up to 100 fUSD worth of tokens.
          </h4>
          <h4 className="mb-3">
            If your collateral ratio falls below 100%, you will get liquidated.
            You will receive the liquidation in fUSD and lose any tokens you had
            as a collateral in the supply balance.
          </h4>
          <h4 className="mb-3">
            It is recommended to keep higher margins of collateral.
          </h4>
          <h4 className="mb-3">
            To add or remove collateral, simply toggle the switches in the
            supply balance section.
          </h4>
        </ModalBody>
      </Modal>
    </div>
  );
};
