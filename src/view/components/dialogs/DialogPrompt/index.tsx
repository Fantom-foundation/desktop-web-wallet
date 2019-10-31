import React, { FC } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

type IProps = {
  isOpened?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onReject?: () => void;
  title: string;
  body: string;
};

const DialogPrompt: FC<IProps> = ({ isOpened, onConfirm, onReject, onClose, title, body }) => {
  return (
    <Modal isOpen={isOpened} toggle={onClose}>
      <ModalHeader toggle={onClose}>{title}</ModalHeader>

      <ModalBody>
        <p>{body}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onReject || onClose}>
          No
        </Button>
        <Button color="primary" onClick={onConfirm || onClose}>
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export { DialogPrompt };
