import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class CancelWalletModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { toggleModal, cancelModalToggle, cancelWallet } = this.props;
    return (
      <Modal isOpen={toggleModal} toggle={cancelModalToggle}>
        <ModalHeader toggle={cancelModalToggle}>Cancel Wallet </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to cancel the create wallet process?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={cancelModalToggle}>
            No
          </Button>
          <Button color="primary" onClick={e => cancelWallet(e)}>
            Yes
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}

CancelWalletModal.propTypes = {
  toggleModal: PropTypes.bool.isRequired,
  cancelModalToggle: PropTypes.func.isRequired,
  cancelWallet: PropTypes.func.isRequired,
};
