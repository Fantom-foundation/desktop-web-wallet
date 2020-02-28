import React, { FC } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface IProps  {
  isOpened?: boolean;
  onClose?: () => void;
  title: string;
  body: string;
};

const DialogInfo: FC<IProps> = ({ isOpened, onClose, title, body }) => {
  return (
    <Modal isOpen={isOpened} toggle={onClose}>
      <ModalHeader toggle={onClose}>{title}</ModalHeader>

      <ModalBody>
        <p>{body}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onClose}>
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export { DialogInfo };