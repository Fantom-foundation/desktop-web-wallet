import React, { useState, useCallback , FC, useMemo, useEffect } from 'react';
import Sidebar from './DashboardSidebar';
import styles from './styles.module.scss';
import classnames from 'classnames';
import { CopyIcon, QrIcon ,DownloadCircleIconGrey} from 'src/view/components/svgIcons';
import { DashboardModal } from '../../Modal';
import QRCodeIcon from '~/view/general/QRCodeIcon/index';
import { copyToClipboard } from '~/utility/clipboard';
import {  RouteComponentProps } from 'react-router';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import fileDownload from 'js-file-download';



const mapStateToProps = state => ({
  accountData: selectAccount(state),
});

const mapDispatchToProps = {
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
};

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{  }> &
  typeof mapDispatchToProps & {address: string};

const DashboardLayout: FC<IProps> = ({
  address,
  history,
  location,
  children,
  accountData,
}) => {

  const [modal, setModal] = useState(false);
  const onClick = useCallback(event => copyToClipboard(event, address), [
    address,
  ]);
  const cardShow =
    location.pathname.includes('send') || location.pathname.includes('receive');
  const toggleModal = () => setModal(!modal);
  const account =
    accountData.list && address && accountData.list[address];

    const keyStore = account && account.keystore

    const handleKeyStoreDownload = () => {
      const dateTime = new Date();
      const fileName = `UTC--${dateTime.toISOString()} -- ${address}`;
      fileDownload(JSON.stringify(keyStore), `${fileName}.json`);
    }

  return (
    <>
      <DashboardModal
        title="Address"
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
            address={address}
            history={history}
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
                <div>
                  <p className={styles.label}>Address</p>
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
                </div>
              </div>
              {children}
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

