import React, { useState, useCallback } from 'react';
import Sidebar from './DashboardSidebar';
import styles from './styles.module.scss';
import classnames from 'classnames';
import { CheckIcon, CopyIcon, QrIcon } from 'src/view/components/svgIcons';
import { DashboardModal } from '../../Modal';
import QRCodeIcon from '~/view/general/QRCodeIcon/index';
import { copyToClipboard } from '~/utility/clipboard';

export default props => {
  const [modal, setModal] = useState(false);
  const { address, history, location, children } = props;
  console.log(location);
  const onClick = useCallback(
    event => copyToClipboard(event, address),
    [address]
  );
  const cardShow =
    location.pathname.includes('send') || location.pathname.includes('receive');
  console.log(cardShow, 'cardShowcardShow');
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
            address={address}
            bgColor="white"
            fgColor="black"
          />
          {/* <img src={QrImage} className="mb-4" /> */}
          <h4 className="opacity-7">{address}</h4>
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
