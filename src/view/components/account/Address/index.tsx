import React, { FC, useCallback } from 'react';
import { FaIcon } from '../../inputs/FaIcon';
import * as styles from './styles.module.scss';
import { copyToClipboard } from '~/utility/clipboard';

interface IProps {
  address: string;
}

const Address: FC<IProps> = ({ address }) => {
  const onClick = useCallback(event => copyToClipboard(event, address), [address]);

  return (
    <div className={styles.address} onClick={onClick}>
      <FaIcon icon="fa-clone" />
      <p>{address}</p>
    </div>
  );
};

export { Address };
