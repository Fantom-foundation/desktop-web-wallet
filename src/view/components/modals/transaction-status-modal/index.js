import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class TxnStatusModal extends React.PureComponent {
  render() {
    const {
      openTxnStatusModal,
      toggleTxnStatusModal,
      statusTextHeader,
      statusTextBody,
    } = this.props;
    return (
      <Modal isOpen={openTxnStatusModal} toggle={toggleTxnStatusModal}>
        <ModalHeader toggle={toggleTxnStatusModal}>{statusTextHeader}</ModalHeader>
        <ModalBody>
          <p>{statusTextBody}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleTxnStatusModal}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
