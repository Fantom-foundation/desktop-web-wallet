import React, { FC, useCallback } from 'react';
import { FaIcon } from '../../inputs/FaIcon';
import styles from './styles.module.scss';
import { copyToClipboard } from '~/utility/clipboard';
import { useTranslation } from 'react-i18next';

interface IProps {
  address: string;
  noIcon?: boolean;
}

const Address: FC<IProps> = ({ address, noIcon }) => {
  const {t} = useTranslation()
  const text = "copiedClipboard"
  const onClick = useCallback(event => copyToClipboard(event, address, text, t), [address, t, text]);

  return (
    <div className={styles.address} onClick={onClick}>
      {!noIcon && <FaIcon icon="fa-clone" />}
      <p>{address}</p>
    </div>
  );
};

export { Address };
