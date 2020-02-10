import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';

export default ({ isOpen = false }) => {
  // const [modal, setModal] = useState(false);

  // const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={isOpen} className={styles.infoModal} centered>
        <ModalBody className={styles.modalBody}>
          <button
            type="button"
            className={classnames('btn-icon', styles.close)}
          >
            <i className="fas fa-times" />
          </button>
          <h2 className="text-center mb-4 pb-2">Borrow balance</h2>
          <h4 className="mb-3">
            The borrow limit is the maximum value you can borrow.
          </h4>
          <h4 className="mb-3">
            Borrowing assets lowers the borrow limit, increases the borrow
            balance and decreases the collateral ratio.
          </h4>
          <h4 className="mb-3">
            You can borrow assets by clicking on the token name and follow the
            instructions.
          </h4>
          <h4 className="mb-3">
            When borrowing tokens, you’ll have to pay interests on the loans
            indicated by the borrow APR.
          </h4>
        </ModalBody>
      </Modal>
    </div>
  );
};
