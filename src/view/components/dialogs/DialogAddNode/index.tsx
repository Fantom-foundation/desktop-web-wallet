import React, { FC, useCallback, useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TextInput } from '../../inputs/TextInput';
import styles from './styles.module.scss';
import { isNodeAddress } from '~/redux/account/validators';

type IProps = {
  isOpened?: boolean;
  onClose: () => void;
  onAdd: (name: string, address: string) => void;
};

const DialogAddNode: FC<IProps> = ({ isOpened, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      // if (!name || name.length < 3) return setError('Name is required');
      if (!address || !isNodeAddress(address))
        return setError('Not a valid node address');

      onAdd(name, address);
      onClose(); 
    },
    [name, address, onAdd, onClose]
  );

  useEffect(() => {
    if (error) setError('');
  }, [name, address, error]);

  return (
    <Modal isOpen={isOpened} toggle={onClose}>
      <form onSubmit={onSubmit}>
        <ModalHeader toggle={onClose}>Add custom node</ModalHeader>

        <ModalBody>
          <div className={styles.content}>
            <TextInput
              label="Name"
              value={name}
              handler={setName}
              placeholder="Custom node"
            />

            <TextInput
              label="Address"
              value={address}
              handler={setAddress}
              placeholder="ws://host.domain:port"
            />
          </div>

          <div className={styles.error}>{error}</div>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button color="primary" type="submit">
            Add
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export { DialogAddNode };
