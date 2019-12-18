import React from 'react';
import { Row, Col } from 'reactstrap';
import { CreateWalletCard } from '../../../components/cards';

// import { Input } from '../../components/forms';

import styles from '../styles.module.scss';
export default () => {
  return (
    <div>
      <CreateWalletCard>
        <div className={styles.title}>
          <h3 className="font-weight-semi-bold">
            2<span className="opacity-3 mr-3">/2</span> Your mnemonic phrase
            <span className="ml-2">
              <i className="fas fa-info-circle"></i>
            </span>
          </h3>
          <p className={`${styles.warning} py-3`}>
            Please backup the text below on paper and keep it somewhere secret
            and safe.
          </p>
        </div>
        <div className={styles.phraseContent}>
          <Row>
            <Col lg={4} className="mt-4">
              <div className={styles.phrase}>
                <span className="opacity-5 mr-2">1.</span>ancient
              </div>
            </Col>
            <Col lg={4} className="mt-4">
              <div className={styles.phrase}>
                <span className="opacity-5 mr-2">2.</span>ancient
              </div>
            </Col>
            <Col lg={4} className="mt-4">
              <div className={styles.phrase}>
                <span className="opacity-5 mr-2">3.</span>ancient
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} className="mt-4">
              <p className={styles.view}>
                <i className="fas fa-info-circle mr-2"></i>View your Private Key
              </p>
            </Col>
          </Row>
        </div>
        <div className={styles.downloadBtnWrapper}>
          <button className={`${styles.downloadBtn}`}>
            I wrote down my recovery key
          </button>
        </div>
      </CreateWalletCard>
    </div>
  );
};
