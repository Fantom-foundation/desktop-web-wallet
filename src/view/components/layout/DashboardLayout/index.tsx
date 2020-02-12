/* eslint-disable react/no-multi-comp */
import React, { useState, useCallback, FC, useMemo, useEffect } from 'react';
import Sidebar from './DashboardSidebar';
import styles from './styles.module.scss';
import classnames from 'classnames';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

import {
  CopyIcon,
  QrIcon,
  DownloadCircleIconGrey,
} from 'src/view/components/svgIcons';
import { DashboardModal } from '../../Modal';
import QRCodeIcon from '~/view/general/QRCodeIcon/index';
import { copyToClipboard } from '~/utility/clipboard';
import { RouteComponentProps } from 'react-router';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import fileDownload from 'js-file-download';
import { useTranslation } from 'react-i18next';

const mapStateToProps = state => ({
  accountData: selectAccount(state),
});

const mapDispatchToProps = {
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
  accountRemoveAction: ACCOUNT_ACTIONS.accountRemoveAction,
};

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{}> &
  typeof mapDispatchToProps & { address: string };

const DashboardLayout: FC<IProps> = ({
  address,
  history,
  location,
  children,
  accountData,
  accountRemoveAction,
}) => {
  const [modal, setModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const onClick = useCallback(event => copyToClipboard(event, address), [
    address,
  ]);
  const cardShow =
    location.pathname.includes('send') || location.pathname.includes('receive');
  const toggleModal = () => setModal(!modal);
  const account = accountData.list && address && accountData.list[address];

  const keyStore = account && account.keystore;

  const handleKeyStoreDownload = () => {
    const dateTime = new Date();
    const fileName = `UTC--${dateTime.toISOString()} -- ${address}`;
    fileDownload(JSON.stringify(keyStore), `${fileName}.json`);
  };

  const handleLogout = () => {
    setLogoutModal(true);
  };

  const handleWalletLogout = () => {
    accountRemoveAction(account && account.publicAddress);
    setLogoutModal(false);
  };
  const { t } = useTranslation();
  const onClose = () => {
    setLogoutModal(false);
  };
  const { pathname } = location;
  const screen = pathname.slice(pathname.lastIndexOf('/') + 1);

  let heading,
    info,
    wallet = false;
  switch (screen) {
    case 'defi':
      heading = 'Trade, lend, and borrow on Opera.';
      info = 'Your decentralized finance suite';
      break;
    case 'f-trade':
      heading = 'fTrade';
      info = 'Buy and sell synthetics on Fantom';
      break;
    case 'f-lend':
    case 'f-lend-borrow':
      heading = 'fLend';
      info = 'Earn interest on loans. Borrow tokens on interest.';
      break;
    case 'send':
      heading = 'Send';
      wallet = true;
      break;
    case 'receive':
      heading = 'Receive';
      wallet = true;
      break;
    case 'stake':
      heading = 'Stake';
      wallet = true;
      break;
    default:
      heading = 'Dashboard';
      wallet = true;
      break;
  }

  const RenderLayout = () => {
    return wallet ? (
      <>
        <h3 className="opacity-5">FantomWallet</h3>
        <h1 className={styles.mainTitle}>{heading}</h1>
      </>
    ) : (
      <div className="text-center">
        <h1 className="font-weight-semi-bold">{heading}</h1>
        <h2 style={{ fontWeight: 500 }}>{info}</h2>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={logoutModal}
        toggle={onClose}
      >
        <form>
          <ModalHeader>{t('logoutMsg')}</ModalHeader>

          <ModalBody>
            <div className={styles.content}>
              <p>{t('logoutDesc')}.</p>
              <p>{t('reverseAction')}.</p>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="text-center w-100">
              <Button className="mx-3" color="secondary" onClick={onClose}>
                Cancel
              </Button>

              <Button
                className="mx-3"
                color="primary"
                type="submit"
                onClick={handleWalletLogout}
              >
                Logout
              </Button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    );
  };

  return (
    <>
      <DashboardModal
        title={t('address')}
        isOpen={modal}
        toggle={toggleModal}
        bodyClassName="d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          <QRCodeIcon address={address} bgColor="white" fgColor="black" />
          {/* <img src={QrImage} className="mb-4" /> */}
          <h4 className={classnames(styles.qrHashAddress, 'opacity-7')}>
            {address}
          </h4>
        </div>
      </DashboardModal>
      <div
        className={classnames(styles.root, { [styles.withoutCard]: cardShow })}
      >
        <div className={styles.wrapper}>
          <Sidebar
            mainMenu={wallet}
            address={address}
            history={history}
            handleLogout={handleLogout}
            pathname={location.pathname}
          />

          <div className={styles.contentWrapper}>
            <main className={styles.main}>
              <div
                className={classnames(styles.contentHeader, {
                  [styles.withoutCard]: cardShow,
                })}
              >
                {/* <div className="d-flex justify-content-end mb-3">
                  <p className={styles.sync}>
                    <CheckIcon />
                    Synchronized
                  </p>
                </div> */}
                {/* <div>
                  <p className={styles.label}>{t('address')}</p>
                </div>
                <div className={styles.hashWrapper}>
                  <div>
                    <p className={styles.hash}>{address}</p>
                  </div>
                  <div className={styles.hashHandlers}>
                    <button type="button" onClick={onClick}>
                      <CopyIcon />
                    </button>
                    <button type="button" onClick={toggleModal}>
                      <QrIcon />
                    </button>

                    <button type="button" onClick={handleKeyStoreDownload}>
                      <DownloadCircleIconGrey />
                    </button>
                  </div>
                </div> */}
                <RenderLayout />
              </div>

              {children}
              {renderModal()}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardLayoutRouter = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardLayout);

export default DashboardLayoutRouter;
