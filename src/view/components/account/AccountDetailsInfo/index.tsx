import React, { FC, useCallback, useEffect } from 'react';
import { PanelTitle } from '~/view/components/panels/PanelTitle';
import { IAccount } from '~/redux/account/types';
import * as styles from './styles.module.scss';
import { Button } from 'reactstrap';
import { PanelButton } from '~/view/components/panels/PanelButton';
import Identicons from '~/view/general/identicons/identicons';
import { Address } from '~/view/components/common/Address';
import QRCodeIcon from '~/view/general/qr';
import { connect } from 'react-redux';

import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    account: IAccount;
  };

const AccountDetailsInfoUnconnected: FC<IProps> = ({ account, accountGetBalance }) => {
  const getBalance = useCallback(() => accountGetBalance(account.public_address), [account.public_address, accountGetBalance]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <div className={styles.wrap}>
      <PanelTitle
        title="Account management"
        right={<PanelButton onClick={getBalance} icon="fa-sync-alt" spin={account.is_loading_balance} />}
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
          <b>{account.balance || '0'}</b>
          {' '}
FTM
        </div>

        <Button color="primary bordered">Transfer</Button>
      </div>
    </div>
  );
};

const AccountDetailsInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetailsInfoUnconnected);

export { AccountDetailsInfo };
