import React from 'react';
import styles from './styles.module.scss';
import { Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';

export default ({ isOpen, toggle, children, bodyClassName = '' }) => (
  <Modal
    isOpen={isOpen}
    toggle={toggle}
    className={classnames('modal-dialog-centered', styles.modal)}
  >
    <ModalBody className={classnames(styles.body, bodyClassName)}>
      {children}
    </ModalBody>
  </Modal>
);
