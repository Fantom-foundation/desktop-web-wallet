/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useTranslation } from "react-i18next";

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
  accountCreateRestorePrivateKey:
    ACCOUNT_ACTIONS.accountCreateRestorePrivateKey,
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
  accountCreateRestorePrivateKey,
}) => {
  const [phrase, setPhrase] = useState('');
  const [error, setError] = useState(false);
  const [uploadedFile, setFile] = useState()
  const [currentTab, setCurrentTab] = useState(1)
  const [password, setPassword] = useState('')
  const [fileError, setFileError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [userPrivateKey, setUserPrivateKey] = useState('');
  const [privateKeyError , setPrivateKeyError] = useState(false)
  const {t} = useTranslation();
  const [is_incorrect_modal_visible, setIsIncorrectModalVisible] = useState(
    false
  );


  const is_next_disabled = useMemo<boolean>(() => {
    if (phrase.length === 0) return false;
    // let isCorrectWords = true

    const words = phrase
      .split(' ')
      .map(el => el.trim())
      .filter(el => {
        // if(/^[a-zA-Z]+$/.test(el)){
        //   setError(true)
        // }
        return /^[a-zA-Z]+$/.test(el)
      });

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
    let isValidMnemonics = true
    const words =
      phrase !== '' &&
      phrase
        .split(' ')
        .map(el => el.trim())
        .filter(el => {
          
            if(el !== '' && !/^[a-zA-Z]+$/.test(el)){
              // setError(true)
              isValidMnemonics = false
            }
            return /^[a-zA-Z]+$/.test(el)
          
        });
    const validation_errors = {
      phrase:
        phrase === '' ||
        (words && !(words.length === 12 || words.length === 24) || !isValidMnemonics),
    };

    if (validation_errors.phrase) return setError(validation_errors.phrase);

    if (!is_next_disabled) return setIsIncorrectModalVisible(true);

    const mnemonic = phrase
      .split(' ')
      .map(el => el.trim())
      .filter(el => /^[a-zA-Z]+$/.test(el))
      .join(' ');

    accountCreateRestoreMnemonics({ mnemonic });
    // push('/account/restore/credentials')
  }, [is_next_disabled, accountCreateRestoreMnemonics, phrase]);

  const onUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file) return;
    setFile(file);

    },
    []
  );


  const handleFileSubmit = useCallback(
    () => {
     
      accountUploadKeystore(uploadedFile, password);
    },
    [accountUploadKeystore,password,  uploadedFile]
  );

  // const handleCurrentTab = useCallback(
  //   tab => {
  //     setCurrentTab(tab);
  //   },
  //   [setCurrentTab]
  // );

  const handlePrivateKeySubmit = useCallback(() => {
    const regx = /^[a-zA-Z0-9]+$/;
    if (
      (
         (userPrivateKey === '' ||
        userPrivateKey.length !== 66 ||
        regx.test(userPrivateKey) === false ||
        userPrivateKey.toLowerCase().substring(0, 2) !== '0x')
      )
    ) {
      setPrivateKeyError(true)

    } else {
      accountCreateRestorePrivateKey({ privateKey: userPrivateKey });


    }
  }, [userPrivateKey, accountCreateRestorePrivateKey]);

  

  

  const handleAllSubmit = useCallback((e: any) => {
    e.preventDefault();
 

    if (currentTab === 1) {
      if(!(password && password !== '')){
        setPassError(true)
        return
      }
      if(!uploadedFile){
        setFileError(true)
        return 
  
      }
      handleFileSubmit()
    } else if (currentTab === 2) {
      onSubmit();
    } else if (currentTab === 3) {
      handlePrivateKeySubmit();
    }
     
    },
    [currentTab, password, uploadedFile, handleFileSubmit, onSubmit, handlePrivateKeySubmit]
  );


  const getErrorText = () => {
    if(passError){
      return t('pleaseEnterPassword')

    }
    if(fileError){
      return t('pleaseUploadKeystore')

    }
    if(Object.keys(accountDetails.errors).length > 0 && accountDetails.errors.keystore){
      if(accountDetails.errors.keystore === 'Invalid keystore file or password'){
        return t('invalidKeystoreTitle')
      } 
       if(accountDetails.errors.keystore === 'An account with this address already exist'){
        return t('accountAlreadyExist')

      }
      return accountDetails.errors.keystore

    }


    
  }

  const handleTabs = (tab) => {
    setCurrentTab(tab)

  setPrivateKeyError(false)
  setPassError(false)
  setFileError(false)
  setError(false)

  }

  const getButtonActiveClass = () => {
    if(currentTab === 2){
      if(is_next_disabled){
        return 'primary'
      }
      return 'secondary'
    }

    if(currentTab === 1){


      // if(!(password && password !== '')){
      //   setPassError(true)
      //   return
      // }
   if((password && password !== '') && uploadedFile){
        return 'primary'
      }
      return 'secondary'
    }

    if(currentTab === 3){
   if(userPrivateKey && userPrivateKey.length === 66){
    return 'primary'
  }
  return 'secondary'
    }

  }

  const handleClose = () => {
    push('/')
  }

  let isPrivateKeyError = false;
  if(Object.keys(accountDetails.errors).length > 0 && accountDetails.errors.privateKey){
    isPrivateKeyError = true

  }

  let isMnemonicExistError = false;
  if(Object.keys(accountDetails.errors).length > 0 && accountDetails.errors.mnemonic){
    isMnemonicExistError = true

  }

  


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
      <AccessWalletCard handleClose={handleClose} t={t}>
        <div className={styles.mainWrapper}>
          <div>
            <div className={styles.optionsWrapper}>
              <div className={styles.optionCol}>
                <div
                  className={classnames(styles.option, {
                    [styles.active]: currentTab === 1,
                  })}
                  onClick={() => handleTabs(1)}
                >
                  <KeystoreIcon />
                  <h4 className="opacity-7">{t("keystore")}</h4>
                </div>
              </div>
              <div className={styles.optionCol}>
                <div
                  className={classnames(styles.option, {
                    [styles.active]: currentTab === 2,
                  })}
                  onClick={() => handleTabs(2)}
                >
                  <MnemonicIcon />
                <h4 className="opacity-7">{t('mnemonicPhrase')}</h4>
                </div>
              </div>
              <div className={styles.optionCol}>
                <div
                  className={classnames(styles.option, {
                    [styles.active]: currentTab === 3,
                  })}
                  onClick={() => handleTabs(3)}
                >
                  <PrivatekeyIcon className="mt-1" />
                <h4 className="opacity-7">{t('privateKey')}</h4>
                </div>
              </div>
            </div>
            {/* --Keystore Start-- */}
            {currentTab === 1 && (
              <div>
                <div className={classnames(styles.fileUploadBtnWrapper)}>
                  <label
                    className={classnames(
                      styles.fileUploadBtn,
                      'outlined text-dark-grey-blue btn btn-topaz'
                    )}
                  >
                    <input className="d-none" type="file" onChange={e => {onUpload(e), setFileError(false)}} />
                    <img src={uploadIcon} alt="Upload keystore file" />
                    {t('uploadKeystoreFile')}
                  </label>
                    {uploadedFile && <p className={styles.info}>{t('keystoreSucessfullyLoaded')}</p>}
                  </div>
                  <FormInput
                    accessWallet
                    noBorder
                    type="password"
                    placeholder={t('enterYourWalletPassword')}
                    value={password}
                    handler={val => {
                      setPassword(val)
                      setPassError(false)
                    }}
                    isError={passError}
                    errorMsg={getErrorText()}
                  />
                
            
         
              </div>)}
            {/* --Keystore End-- */}

            {/* --Mnemonic Start-- */}
            {currentTab === 2 && (<div>
              <h4 className={classnames('opacity-7', styles.inputLabel)}>
            {t('enterMnemonic')}.
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
                {error ? (
<p className={styles.errorText}>{t('invalidRecoveryPhrase')}</p>
                  ) : 
                isMnemonicExistError ? <p className={styles.errorText}>{ accountDetails.errors && accountDetails.errors.mnemonic &&  t('accountAlreadyExist')}</p> : ''
                  }
              </div>
                                  </div>
            )}
            {/* --Mnemonic End-- */}

            {/* --Private Start-- */}
            {currentTab === 3 && (
              <div>
                <FormInput
                  accessWallet
                  type="text"
                  label={t('typePrivateKey')}
                  handler={val => {
                    setUserPrivateKey(val);
                    setPrivateKeyError(false)
                  }}
                  value={userPrivateKey}
                  isError={privateKeyError}
                  errorMsg={isPrivateKeyError ? accountDetails.errors && accountDetails.errors.privateKey && t("accountAlreadyExist") : privateKeyError ? t("enterPrivateValidation") : "" }
                />
              </div>
            )}
          
          </div>
          <div className="text-center">
            <Button
              color={getButtonActiveClass()}
              className={styles.btn}
              onClick={e => handleAllSubmit(e)}
              // disbaled={!is_next_disabled}
            >
            {t("unlockWallet")}
            </Button>
          </div>
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
