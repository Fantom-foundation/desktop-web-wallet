import React from 'react';
import styles from './styles.module.scss';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import classnames from 'classnames';

export default ({ isOpen, toggle, children, title, bodyClassName = '' }) => (
  <Modal
    isOpen={isOpen}
    toggle={toggle}
    className={classnames('modal-dialog-centered', styles.modal)}
  >
    <ModalHeader className={styles.header} toggle={toggle}>
      {title}
    </ModalHeader>
    <ModalBody className={classnames(styles.body, bodyClassName)}>
      {children}
    </ModalBody>
  </Modal>
);
