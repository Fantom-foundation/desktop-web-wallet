import React, { FC, useCallback } from 'react';
import styles from './styles.module.scss';
import { IAccount } from '~/redux/account/types';
import fileSaver from 'file-saver';

interface IProps {
  account: IAccount;
}

const AccountListMenu: FC<IProps> = ({ account }) => {
  const onExport = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();

      const blob = new Blob([JSON.stringify(account.keystore)], {
        type: 'application/json;charset=utf-8',
      });

      fileSaver(blob, 'keystore.json');
    },
    [account]
  );

  return (
    <div className={styles.menu_icon} tabIndex={-1}>
      <span />

      <div className={styles.menu}>
        <div onClick={onExport}>Export keystore</div>
      </div>
    </div>
  );
};

export { AccountListMenu };
