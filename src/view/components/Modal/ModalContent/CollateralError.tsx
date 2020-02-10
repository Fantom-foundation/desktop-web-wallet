import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';
import { ErrorCircleIcon } from 'src/view/components/svgIcons';

export default ({ isOpen = false }) => {
  // const [modal, setModal] = useState(false);

  // const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={isOpen} className={styles.collateralErrorModal} centered>
        <ModalBody className={styles.modalBody}>
          <button
            type="button"
            className={classnames('btn-icon', styles.close)}
          >
            <i className="fas fa-times" />
          </button>
          <h2 className="text-center mb-4 pb-2">
            You cannot remove collateral at this time.
          </h2>
          <h5 className="mb-4 pb-2">
            You don’t have enough collateral to cover your loans. Please add
            more collateral or repay some loans to be able to withdraw from the
            supply balance.
          </h5>
          <div className="text-center">
            <ErrorCircleIcon />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
