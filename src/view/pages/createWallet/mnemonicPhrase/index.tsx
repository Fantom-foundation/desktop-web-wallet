
import React, {
  FC,
  useCallback,
  useEffect,
} from 'react';
import { ACCOUNT_CREATION_STAGES } from '~/redux/account';
import { connect } from 'react-redux';
import {
  MnemonicPhrase,
  MnemonicPhraseWithCross,
} from 'src/view/components/mnemonic';
import { selectAccountCreate } from '~/redux/account/selectors';
import { CreateWalletCard } from '../../../components/cards';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { withRouter, RouteComponentProps } from 'react-router';
import styles from '../styles.module.scss';

const mapStateToProps = selectAccountCreate;
const mapDispatchToProps = {
  accountCreateSetInfo: ACCOUNT_ACTIONS.accountCreateSetInfo,
  accountSetCreateStage: ACCOUNT_ACTIONS.accountSetCreateStage,
};
type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {};
const AccountCreateInfoUnconnected: FC<IProps> = ({
  accountSetCreateStage,
  mnemonic,
  password,
  publicAddress,
}) => {
 
 
  const onBackPressed = useCallback(
    () => accountSetCreateStage(ACCOUNT_CREATION_STAGES.CREDENTIALS),
    [accountSetCreateStage]
  );
  useEffect(() => {
    if (!mnemonic || !password || !publicAddress) onBackPressed();
  }, [mnemonic, onBackPressed, password, publicAddress]);
  
  return (
    <div>
      <CreateWalletCard>
        <div className={styles.title}>
          <h3 className="font-weight-semi-bold">
            2
            <span className="opacity-3 mr-3">/2</span>
            {' '}
Your mnemonic phrase
            <span className="ml-2">
              <i className="fas fa-info-circle" />
            </span>
          </h3>
          <p className={`${styles.warning} py-3`}>
            Please backup the text below on paper and keep it somewhere secret
            and safe.
          </p>
        </div>
        <div className={styles.phraseContent}>
          <MnemonicPhrase mnemonic={mnemonic.split(' ')} />
          <MnemonicPhraseWithCross />
        </div>
        <div className={styles.downloadBtnWrapper}>
          <button type="submit" className={`${styles.downloadBtn}`}>
            I wrote down my recovery key
          </button>
        </div>
      </CreateWalletCard>
    </div>
  );
};
const AccountCreateInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountCreateInfoUnconnected));
export { AccountCreateInfo, AccountCreateInfoUnconnected };
