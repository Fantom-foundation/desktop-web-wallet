import React, { useState } from 'react';
import {
  MnemonicPhrase,
  MnemonicPhraseEmpty,
  MnemonicButtons,
  MnemonicPhraseWithCross,
} from 'src/view/components/mnemonic';
import { WalletModal } from '../../../components/Modal';

import { CreateWalletCard } from '../../../components/cards';

// import { Input } from '../../components/forms';

import styles from '../styles.module.scss';

export default () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);
  return (
    <>
      <div className={styles.createWalletWrap}>
        <CreateWalletCard>
          <div className={styles.title}>
            <h3 className="font-weight-semi-bold">
              2<span className="opacity-3 mr-3">/2</span>
              Your mnemonic phrase
              <span className={`${styles.infoIcon} ml-2`}>
                <i className="fas fa-info-circle" />
                <div className={styles.tooltipWrapper}>
                  <p className={styles.tooltip}>
                    The keystore file will contain your encrypted private key.
                    <br />
                    You’ll need the password to decrypt it. Don’t lose them!
                  </p>
                </div>
              </span>
            </h3>
            <p className={`${styles.warning} py-3`}>
              Please backup the text below on paper and keep it somewhere secret
              and safe.
            </p>
          </div>
          <div className={styles.phraseContent}>
            <MnemonicPhrase />
            <MnemonicPhraseEmpty />
            <MnemonicPhraseWithCross />
            <MnemonicButtons />
            <div className={styles.viewKey}>
              <span onClick={toggleModal}>
                <i className="fas fa-info-circle mr-2" />
                View your private key
              </span>
            </div>
          </div>
          <div className={styles.downloadBtnWrapper}>
            <button type="button" className={`${styles.downloadBtn}`}>
              I wrote down my recovery key
            </button>
          </div>
        </CreateWalletCard>
      </div>
      <WalletModal isOpen={modal} toggle={toggleModal} bodyClassName="">
        <div className={styles.privateKeyModal}>
          <h2 className="text-center">Your Private Key</h2>
          <p className={styles.warning}>
            Please backup the text below on paper and keep it somewhere secret
            and safe.
          </p>
          <h3 className={`${styles.privateKey} font-weight-semi-bold`}>
            63f3b91ad31jhgjc19c99aa85e32aee50639348ee7084b4726d16a62b70e56beb0f7
          </h3>
          <div className={styles.downloadBtnWrapper}>
            <button
              type="button"
              className={styles.downloadBtn}
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      </WalletModal>
    </>
  );
};
