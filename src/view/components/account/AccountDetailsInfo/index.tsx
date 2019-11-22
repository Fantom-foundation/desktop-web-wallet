import React, { FC, useCallback, useEffect } from 'react';
import { PanelTitle } from '~/view/components/panels/PanelTitle';
import { IAccount } from '~/redux/account/types';
import styles from './styles.module.scss';
import { Button } from 'reactstrap';
import { PanelButton } from '~/view/components/panels/PanelButton';
import Identicon from '~/view/general/Identicon';
import { Address } from '~/view/components/account/Address';
import QRCodeIcon from '~/view/general/QRCodeIcon';
import { connect } from 'react-redux';

import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import * as MODAL_ACTIONS from '~/redux/modal/actions';
import { MODALS } from '~/redux/modal/constants';
import { AccountListMenu } from '~/view/pages/account/AccountListMenu';
import { FaIcon } from '../../inputs/FaIcon';
import { selectAccountConnection } from '~/redux/account/selectors';
import { AccountDetailsProvider } from '../AccountDetailsProvider';

const mapStateToProps = state => ({
  connection: selectAccountConnection(state),
});

const mapDispatchToProps = {
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
  modalShow: MODAL_ACTIONS.modalShow,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    account: IAccount;
  };

const AccountDetailsInfoUnconnected: FC<IProps> = ({
  connection: { is_node_connected, error },
  account,
  accountGetBalance,
  modalShow,
}) => {
  const getBalance = useCallback(
    () => accountGetBalance(account.publicAddress),
    [account.publicAddress, accountGetBalance]
  );
  const sendFunds = useCallback(() => modalShow(MODALS.TRANSFERS), [modalShow]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const balance =
    (account.balance && parseFloat(parseFloat(account.balance).toFixed(6))) ||
    0;

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        {!is_node_connected && !error && (
          <div className={styles.connection_overlay}>
            <FaIcon icon="fa-sync-alt" spin />
            Connecting to node...
          </div>
        )}
        {!is_node_connected && error && (
          <div className={styles.error_overlay}>
            <FaIcon icon="fa-exclamation-triangle" />
            <span>{error}</span>
          </div>
        )}

        <AccountListMenu account={account} />

        <div className={styles.icon}>
          <Identicon id={account.icon} width={40} key={0} size={3} />
        </div>

        <div className={styles.name}>{account.name}</div>

        <div className={styles.address}>
          <Address address={account.publicAddress} />
        </div>

        <div className={styles.qr}>
          <QRCodeIcon
            bgColor="white"
            fgColor="black"
            address={account.publicAddress}
          />
        </div>

        <div className={styles.balance}>
          <div className={styles.get_balance} onClick={getBalance}>
            <FaIcon icon="fa-sync-alt" spin={account.is_loading_balance} />
          </div>
          <b>{`${balance} `}</b>
          FTM
        </div>

        <Button color="primary bordered" onClick={sendFunds}>
          Transfer
        </Button>
      </div>

      <AccountDetailsProvider />
    </div>
  );
};

const AccountDetailsInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetailsInfoUnconnected);

export { AccountDetailsInfo };

/*
  <PanelTitle
    title="Account management"
    right={
      <PanelButton
        onClick={getBalance}
        icon="fa-sync-alt"
        spin={account.is_loading_balance}
      />
    }
  />
*/
