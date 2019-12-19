import React, { useState } from 'react';
import Sidebar from './DashboardSidebar';
import styles from './styles.module.scss';
import { CheckIcon, CopyIcon, QrIcon } from 'src/view/components/svgIcons';
import { DashboardModal } from '../../Modal';
import QrImage from 'src/images/qr/Qr.png';
export default ({ children }) => {
  const [modal, setModal] = useState(false);

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
          <img src={QrImage} className="mb-4" />
          <h4 className="opacity-7">
            0xD94Cfae08391a7dBbCCF6B98c5115Be854c09006
          </h4>
        </div>
      </DashboardModal>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.sidebarWrapper}>
            <Sidebar />
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
                  <p className={styles.hash}>
                    0xD94Cfae08391a7dBbCCF6B98c5115Be854c09006
                  </p>
                  <div className={styles.hashHandlers}>
                    <button>
                      <CopyIcon />
                    </button>
                    <button onClick={toggleModal}>
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
