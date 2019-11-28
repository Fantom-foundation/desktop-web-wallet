import React, { FC, useCallback } from 'react';
import { FaIcon } from '../../inputs/FaIcon';
import styles from './styles.module.scss';
import { copyToClipboard } from '~/utility/clipboard';

interface IProps {
  address: string;
  noIcon?: boolean;
}

const Address: FC<IProps> = ({ address, noIcon }) => {
  const onClick = useCallback(event => copyToClipboard(event, address), [
    address,
  ]);

  return (
    <div className={styles.address} onClick={onClick}>
      {!noIcon && <FaIcon icon="fa-clone" />}
      <p>{address}</p>
    </div>
  );
};

export { Address };
