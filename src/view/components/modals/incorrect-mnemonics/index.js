import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class IncorrectMnemonicsModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const SELF = this;
    const { openIncorrectMnemonicsModal, toggleIncorrectMnemonicsModal } = SELF.props;
    return (
      <Modal isOpen={openIncorrectMnemonicsModal} toggle={toggleIncorrectMnemonicsModal}>
        <ModalHeader toggle={toggleIncorrectMnemonicsModal}>Incorrect Mnemonics</ModalHeader>
        <ModalBody>
          <p>The mnemonics that you entered are incorrect.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleIncorrectMnemonicsModal}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
