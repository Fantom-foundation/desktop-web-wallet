import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class IncorrectMnemonicsModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { openIncorrectMnemonicsModal, toggleIncorrectMnemonicsModal } = this.props;
    return (
      <Modal isOpen={openIncorrectMnemonicsModal} toggle={toggleIncorrectMnemonicsModal}>
        <ModalHeader toggle={toggleIncorrectMnemonicsModal}>Incorrect Mnemonics</ModalHeader>
        <ModalBody>
          <p>The mnemonics you entered are incorrect.</p>
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

IncorrectMnemonicsModal.propTypes = {
  openIncorrectMnemonicsModal: PropTypes.bool.isRequired,
  toggleIncorrectMnemonicsModal: PropTypes.func.isRequired,
};
