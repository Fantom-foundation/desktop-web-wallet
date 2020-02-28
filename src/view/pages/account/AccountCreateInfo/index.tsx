import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  MouseEventHandler,
  useRef,
  useMemo,
} from 'react';
import { WalletModal } from '~/view/components/Modal';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { ACCOUNT_CREATION_STAGES } from '~/redux/account';
import { CONFIRMATION_PHRASE } from '~/redux/account/constants';
import styles from './styles.module.scss';
import { Layout } from '~/view/components/layout/Layout';
import { Push } from 'connected-react-router';
import { useTranslation } from "react-i18next";

import {
  MnemonicPhrase,
} from 'src/view/components/mnemonic';
import { CreateWalletCard } from '../../../components/cards';

const mapStateToProps = selectAccountCreate;
const mapDispatchToProps = {
  accountCreateSetInfo: ACCOUNT_ACTIONS.accountCreateSetInfo,
  accountSetCreateStage: ACCOUNT_ACTIONS.accountSetCreateStage,
  accountGetPrivateKey: ACCOUNT_ACTIONS.accountGetPrivateKey,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {
    push: Push
  };

const AccountCreateInfoUnconnected: FC<IProps> = ({
  accountSetCreateStage,
  accountCreateSetInfo,
  mnemonic,
  password,
  publicAddress,
  accountGetPrivateKey,
  history,
}) => {
  const [is_revealed, setIsRevealed] = useState(false);
  const [modal, setModal] = useState(false);
  const [privateKey, setPrivateKey] = useState('');

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      accountGetPrivateKey(mnemonic, key => {
        setPrivateKey(key);
      });
    }
  };

 

  const onNextPressed = useCallback(() => {
    accountCreateSetInfo();
  }, [accountCreateSetInfo]);

  const onBackPressed = useCallback(
    () => accountSetCreateStage(ACCOUNT_CREATION_STAGES.CREDENTIALS),
    [accountSetCreateStage]
  );

  useEffect(() => {
    if (!mnemonic || !password || !publicAddress) onBackPressed();
  }, [mnemonic, onBackPressed, password, publicAddress]);

  const handleClose = () => {
    history.push('/')
  }
  const { t } = useTranslation();


  return (
    <Layout>
      <div>
        <CreateWalletCard handleClose={() => handleClose()} title={t("createNewWallet")}>
          <div className={styles.title}>
            <h3 className="font-weight-semi-bold">
              2
              <span className="opacity-3 mr-2 mr-md-3">/2</span>
              {t("yourMnemonicPhrase")}
              
            </h3>
            <p className={`${styles.warning} py-3`}>
              {t("backupMnemonics")}
.
            </p>
          </div>
          <div className={styles.phraseContent}>
            <MnemonicPhrase mnemonic={mnemonic.split(' ')} />
            <div className={styles.viewKey}>
              <span onClick={toggleModal}>
                <i className="fas fa-info-circle mr-2" />
                {t("viewPrivateKey")}
              </span>
            </div>
          </div>

          <WalletModal isOpen={modal} toggle={toggleModal} bodyClassName="">
            <div className={styles.privateKeyModal}>
              <h2 className="text-center">{t("yourPrivateKey")}</h2>
              <p className={styles.warning}>
                {t("backupMnemonics")}
.
              </p>
              <h3 className={`${styles.privateKey} font-weight-semi-bold`}>
                {privateKey}
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

          <div className={styles.downloadBtnWrapper}>
            <button
              type="button"
              className={`${styles.downloadBtn}`}
              onClick={onNextPressed}
            >
              {t("wroteRecoveryKey")}
            </button>
          </div>
        </CreateWalletCard>
      </div>
    </Layout>
    
  );
};

const AccountCreateInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountCreateInfoUnconnected));

export { AccountCreateInfo, AccountCreateInfoUnconnected };
