import React, { FC, useCallback } from 'react';
import styles from './styles.module.scss';
import { IAccount } from '~/redux/account/types';
import Identicons from '~/view/general/Identicon';
import { Address } from '~/view/components/account/Address';
import { AccountListMenu } from '../AccountListMenu';

interface IProps {
  account: IAccount;
  onSelect: (address: IAccount['publicAddress']) => void;
}

const AccountListItem: FC<IProps> = ({ account, onSelect }) => {
  const onClick = useCallback(() => {
    onSelect(account.publicAddress);
  }, [onSelect, account]);


  return (
    <div className={styles.card} onClick={onClick}>
      <AccountListMenu account={account} />

      <div className="avatar">
        <span className="avatar-icon">
          <Identicons id={account.icon} width={40} key={0} size={3} />
        </span>
      </div>

      <h2 className={styles.title}>
        <span>{account.name}</span>
      </h2>

      <Address address={account.publicAddress} />
    </div>
  );
};

export { AccountListItem };
