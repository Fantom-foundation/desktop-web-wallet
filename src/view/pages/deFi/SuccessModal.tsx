import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Modal, ModalBody } from 'reactstrap';
import { CheckCircleIcon } from 'src/view/components/svgIcons';

export default () => {
  return (
    <>
      <Modal isOpen={true} centered className={styles.successModal}>
        <ModalBody className={styles.modalBody}>
          <h2>Congratulations!</h2>
          <div className={styles.receiveRewards}>
            <h2>You sold </h2>
            <h1>13.92075 fUSD</h1>
          </div>

          <div>
            <CheckCircleIcon />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
