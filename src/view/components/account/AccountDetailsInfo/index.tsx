import React, { FC } from 'react';
import { PanelTitle } from '../../panels/PanelTitle';
import { IAccount } from '~/redux/account/types';
import * as styles from './styles.module.scss';
import { Button } from 'reactstrap';
import { PanelButton } from '../../panels/PanelButton';
import Identicons from '~/view/general/identicons/identicons';
import { Address } from '../../common/Address';
import QRCodeIcon from '~/view/general/qr';

interface IProps {
  account: IAccount;
}

const AccountDetailsInfo: FC<IProps> = ({ account }) => (
  <div className={styles.wrap}>
    <PanelTitle
      title="Account management"
      right={<PanelButton onClick={console.log} icon="fa-sync-alt" />}
    />

    <div className={styles.content}>
      <div className={styles.icon}>
        <Identicons id={account.icon} width={40} key={0} size={3} />
      </div>

      <div className={styles.name}>{account.name}</div>

      <div className={styles.address}>
        <Address address={account.public_address} />
      </div>

      <div className={styles.qr}>
        <QRCodeIcon bgColor="white" fgColor="black" address={account.public_address} />
      </div>

      <div className={styles.balance}>
        <b>0</b> 
        FTM
      </div>

      <Button color="primary bordered">Transfer</Button>
    </div>
  </div>
);

export { AccountDetailsInfo };
