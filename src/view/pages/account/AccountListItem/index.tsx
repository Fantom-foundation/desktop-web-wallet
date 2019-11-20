import React, { FC, useCallback } from 'react';
import styles from './styles.module.scss';
import { IAccount } from '~/redux/account/types';
import Identicons from '~/view/general/Identicon';
import { Address } from '~/view/components/account/Address';

interface IProps {
  account: IAccount;
  onSelect: (address: IAccount['publicAddress']) => void;
  onExport: (account: IAccount) => void;
}

const AccountListItem: FC<IProps> = ({ account, onSelect, onExport }) => {
  const onClick = useCallback(() => {
    onSelect(account.publicAddress);
  }, [onSelect, account]);

  const onExportClick = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();
      onExport(account);
    },
    [onExport, account]
  );

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.menu_icon} tabIndex={-1}>
        <span />

        <div className={styles.menu}>
          <div onClick={onExportClick}>Export keystore</div>
        </div>
      </div>

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
