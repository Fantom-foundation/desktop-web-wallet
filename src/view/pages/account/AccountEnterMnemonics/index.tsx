import React, { FC, useState, useCallback, useMemo, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { push as historyPush } from 'connected-react-router';
import { AccountRestoreProcess } from '~/view/components/account/AccountRestoreProcess';
import { PanelTitle } from '~/view/components/panels/PanelTitle';
import { Textarea } from '~/view/components/inputs/Textarea';
import { DialogInfo } from '~/view/components/dialogs/DialogInfo';
import { DialogPrompt } from '~/view/components/dialogs/DialogPrompt';
import { Input, Button } from 'reactstrap';
import { AccessWalletCard } from 'src/view/components/cards';
import classnames from 'classnames';
import uploadIcon from 'src/images/icons/upload.svg';

import { Input as FormInput } from 'src/view/components/forms';
import {
  KeystoreIcon,
  MnemonicIcon,
  PrivatekeyIcon,
} from 'src/view/components/svgIcons';
import styles from './styles.module.scss';
import { Layout } from '~/view/components/layout/Layout';
import { setDelegatorByAddressFailure } from '~/redux/stake/handlers';

// const mapStateToProps = selectAccountCreate;
const mapStateToProps = state => ({
  accountDetails: selectAccountCreate(state),
});
const mapDispatchToProps = {
  accountCreateRestoreMnemonics: ACCOUNT_ACTIONS.accountCreateRestoreMnemonics,
  accountCreateCancel: ACCOUNT_ACTIONS.accountCreateCancel,
  accountUploadKeystore: ACCOUNT_ACTIONS.accountUploadKeystore,

  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {};

const AccountEnterMnemonicsUnconnected: FC<IProps> = ({
  // errors,
  accountCreateRestoreMnemonics,
  accountCreateCancel,
  accountUploadKeystore,
  push,
  accountDetails,
}) => {
  const [phrase, setPhrase] = useState('');
  const [error, setError] = useState(false);
  const [uploadedFile, setFile] = useState()
  const [currentTab, setCurrentTab] = useState(2)
  const [is_incorrect_modal_visible, setIsIncorrectModalVisible] = useState(
    false
  );
  console.log('*****adjsjasaccountData', accountDetails)

  // console.log((/^[a-zA-Z]+$/).test('dsas'), '******errors');

  const is_next_disabled = useMemo<boolean>(() => {
    if (phrase.length === 0) return false;

    const words = phrase
      .split(' ')
      .map(el => el.trim())
      .filter(el => /^[a-zA-Z]+$/.test(el));

    return words.length === 12 || words.length === 24;
  }, [phrase]);

  // const onCancelModalOpen = useCallback(() => {
  //   setIsCancelModalOpened(true);
  // }, [setIsCancelModalOpened]);

  // const onCancelModalClose = useCallback(() => {
  //   setIsCancelModalOpened(false);
  // }, [setIsCancelModalOpened]);

  // const onIncorrectModalClose = useCallback(() => {
  //   setIsIncorrectModalVisible(false);
  // }, [setIsIncorrectModalVisible]);

  const onSubmit = useCallback(() => {
    const words =
      phrase !== '' &&
      phrase
        .split(' ')
        .map(el => el.trim())
        .filter(el => /^[a-zA-Z]+$/.test(el));
    const validation_errors = {
      phrase:
        phrase === '' ||
        (words && !(words.length === 12 || words.length === 24)),
    };

    if (validation_errors.phrase) return setError(validation_errors.phrase);

    if (!is_next_disabled) return setIsIncorrectModalVisible(true);

    const mnemonic = phrase
      .split(' ')
      .map(el => el.trim())
      .filter(el => /^[a-zA-Z]+$/.test(el))
      .join(' ');
    console.log(mnemonic, '****mnemonic');

    accountCreateRestoreMnemonics({ mnemonic });
    // push('/account/restore/credentials')
  }, [is_next_disabled, accountCreateRestoreMnemonics, phrase]);

  const onUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];

      if (!file) return;
      setFile(file)

      // accountUploadKeystore(file, password);
    },
    []
  );

  const handleFileSubmit = useCallback(
    () => {
     
      accountUploadKeystore(uploadedFile, 'Sunil@123');
    },
    [accountUploadKeystore, uploadedFile]
  );
  console.log('******is_incorrect_modal_visible', !is_next_disabled);

  const handleCurrentTab = useCallback(
    tab => {
     
     setCurrentTab(tab)
    },
    [setCurrentTab]
  );

  const handlePrivateKeySubmit = useCallback(
    () => {
     
    //  setCurrentTab(tab)
    },
    []
  );

  

  const handleAllSubmit = useCallback(
    () => {
      if(currentTab === 1){
        handleFileSubmit()

      } else if (currentTab === 2){
        onSubmit()

      } else if (currentTab === 3){
        handlePrivateKeySubmit()
      }
     
    //  setCurrentTab(tab)
    },
    [currentTab, handlePrivateKeySubmit, onSubmit, handleFileSubmit]
  );

  


  return (
    // <div>
    //   <AccountRestoreProcess stepNo={2} />

    //   <section className={styles.container}>
    //     <Container>
    //       <Row>
    //         <Col>
    //           <div className={styles.content}>
    //             <PanelTitle title="Restore Wallet" />

    //             <div className={styles.inputs}>
    //               <FormGroup>
    //                 <Label for="wallet-seed">Enter wallet seed:</Label>

    //                 <Textarea
    //                   value={phrase}
    //                   handler={setPhrase}
    //                   placeholder="Enter your secret twelve word phrase here to restore your vault. Separate words with spaces."
    //                 />
    //               </FormGroup>

    //               <div className={styles.or}>
    //                 <span>OR</span>
    //               </div>

    //               <FormGroup>
    //                 <div className={styles.dropzone}>
    //                   <div className={styles.dropzone_sign}>
    //                     <h2>Drop keystore file here</h2>

    //                     <Button color="primary">Upload keystore file</Button>
    //                   </div>
    //                   <input type="file" onChange={onUpload} />
    //                 </div>

    //                 <div className={styles.error}>{errors.keystore}</div>
    //               </FormGroup>
    //             </div>
    //           </div>

    //           <div className={styles.buttons}>
    //             <Button
    //               color={
    //                 is_next_disabled ? 'secondary bordered' : 'primary bordered'
    //               }
    //               onClick={onSubmit}
    //             >
    //               Restore wallet
    //             </Button>
    //             <Button color="secondary bordered" onClick={onCancelModalOpen}>
    //               Cancel
    //             </Button>
    //           </div>
    //         </Col>
    //       </Row>
    //     </Container>

    //     <DialogPrompt
    //       title="Cancel Wallet"
    //       body="Are you sure you want to cancel the create wallet process?"
    //       onConfirm={accountCreateCancel}
    //       onClose={onCancelModalClose}
    //       isOpened={is_cancel_modal_opened}
    //     />

    //     <DialogInfo
    //       isOpened={is_incorrect_modal_visible}
    //       onClose={onIncorrectModalClose}
    //       body="The mnemonics you entered are incorrect"
    //       title="Incorrect Mnemonics"
    //     />
    //   </section>
    // </div>

    <Layout>
      <AccessWalletCard>
        <div className={styles.optionsWrapper}>
          <div className={styles.optionCol}>
            <div
              className={classnames(styles.option, { [styles.active]: currentTab === 1 })}
              onClick={() => handleCurrentTab(1)}
            >
              <KeystoreIcon />
              <h4 className="opacity-7">Keystore</h4>
            </div>
          </div>
          <div className={styles.optionCol}>
            <div
              className={classnames(styles.option, { [styles.active]: currentTab === 2 })}
              onClick={() => handleCurrentTab(2)}
            >
              <MnemonicIcon />
              <h4 className="opacity-7">Mnemonic phrase</h4>
            </div>
          </div>
          <div className={styles.optionCol}>
            <div
              className={classnames(styles.option, { [styles.active]: currentTab === 3 })}
              onClick={() => handleCurrentTab(3)}
            >
              <PrivatekeyIcon className="mt-1" />
              <h4 className="opacity-7">Private key</h4>
            </div>
          </div>
        </div>
        {/* --Keystore Start-- */}
        {currentTab === 1 && <div>
          <label
            className={classnames(
              styles.fileUploadBtn,
              'outlined text-dark-grey-blue btn btn-topaz'
            )}
          >
            <input className="d-none" type="file" />
            <img src={uploadIcon} alt="Upload keystore file" />
            Upload keystore file
          </label>
          <p> Keystore sucessfully loaded</p>
          <FormInput
            accessWallet
            type="password"
            placeholder="Enter you wallet password"
            handler={() => {}}
            isError
            errorMsg="dsf"
          />
        </div>}
        {/* --Keystore End-- */}

        {/* --Mnemonic Start-- */}
        {currentTab === 2 && <div>
          <h4 className={classnames('opacity-7', styles.inputLabel)}>
            Please type in your 12 or 24 word mnemonic phrase, all lower-case,
            separate by single spaces.
          </h4>
      
          <div className={styles.inputWrapper}>
            {/* <div className={styles.dropzone}>
              <div className={styles.dropzone_sign}>
                <h2>Drop keystore file here</h2>

                <Button color="primary">Upload keystore file</Button>
              </div>
              <input type="file" onChange={onUpload} />
            </div>

            <div className={styles.error}>{errors.keystore}</div> */}
            {/* <input type="file" onChange={onUpload} /> */}
            <Input
              type="textarea"
              className={classnames(styles.input, styles.textarea, {
                [styles.isError]: error,
              })}
              value={phrase}
              onChange={e => {
                setPhrase(e.target.value);
                setError(false);
              }}
            />
            {error && (
              <p className={styles.errorText}>Invalid recovery phrase</p>
            )}
          </div>
        </div>}
        {/* --Mnemonic End-- */}

        {/* --Private Start-- */}
        { currentTab === 3 && <div>
          <FormInput
            accessWallet
            type="text"
            label="Please type in your private key"
            handler={() => {}}
            isError
            errorMsg="dsf"
          />
        </div>}
        {/* --Private End-- */}
        <div className="text-center">
          <Button
            color={!is_next_disabled ? 'secondary' : 'primary'}
            className={styles.btn}
            onClick={() => handleAllSubmit()}
          >
            Unlock wallet
          </Button>
        </div>
      </AccessWalletCard>
    </Layout>
  );
};

const AccountEnterMnemonics = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountEnterMnemonicsUnconnected));

export { AccountEnterMnemonics };
