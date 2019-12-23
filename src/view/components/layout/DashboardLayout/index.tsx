import React, { useState, useCallback } from 'react';
import Sidebar from './DashboardSidebar';
import styles from './styles.module.scss';
import { CheckIcon, CopyIcon, QrIcon } from 'src/view/components/svgIcons';
import { DashboardModal } from '../../Modal';
//import QrImage from 'src/images/qr/Qr.png';
import QRCodeIcon from '~/view/general/QRCodeIcon/index';
import { copyToClipboard } from '~/utility/clipboard';

export default props => {
  const [modal, setModal] = useState(false);
  const onClick = useCallback(
    event => copyToClipboard(event, props.account.publicAddress),
    [props.account.publicAddress]
  );

  const toggleModal = () => setModal(!modal);
  return (
    <>
      <DashboardModal
        title="Address"
        isOpen={modal}
        toggle={toggleModal}
        bodyClassName="d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          <QRCodeIcon
            address={props.account.publicAddress}
            bgColor="white"
            fgColor="black"
          />
          {/* <img src={QrImage} className="mb-4" /> */}
          <h4 className="opacity-7">{props.account.publicAddress}</h4>
        </div>
      </DashboardModal>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.sidebarWrapper}>
            <Sidebar
              address={props.account.publicAddress}
              history={props.history}
              pathname={props.location.pathname}
            />
          </div>
          <div className={styles.contentWrapper}>
            <main className={styles.main}>
              <div className={styles.contentHeader}>
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
                  <p className={styles.hash}>{props.account.publicAddress}</p>
                  <div className={styles.hashHandlers}>
                    <button onClick={onClick}>
                      <CopyIcon />
                    </button>
                    <button onClick={toggleModal}>
                      <QrIcon />
                    </button>
                  </div>
                </div>
              </div>
              {props.children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
