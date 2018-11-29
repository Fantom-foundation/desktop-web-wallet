import React from 'react';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';

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
        <ModalBody style={{ textAlign: 'center' }}>
          The mnemonics that you entered are incorrect.
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
