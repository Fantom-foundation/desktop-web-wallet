/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  useMemo,
  memo,
} from 'react';
import { connect } from 'react-redux';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { ACCOUNT_CREATION_STAGES, IAccountState } from '~/redux/account';
import shuffle from 'lodash/shuffle';
import styles from './styles.module.scss';
import { pick } from 'ramda';
import { IState } from '~/redux/store';
import Verification from '../../verification';
import classnames from 'classnames';
import { WalletModal } from '~/view/components/Modal';
import { Layout } from '~/view/components/layout/Layout';

import {
  MnemonicPhrase,
  MnemonicPhraseEmpty,
  MnemonicButtons,
  MnemonicPhraseWithCross,
} from 'src/view/components/mnemonic';
import { CreateWalletCard } from '../../../components/cards';
import { Col, Row, Container, Button } from 'reactstrap';
import { AccountCreateProcess } from '~/view/components/account/AccountCreateProccess';
import { DialogInfo } from '~/view/components/dialogs/DialogInfo';
import { DialogPrompt } from '~/view/components/dialogs/DialogPrompt';

 const ENUM_WORD = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelve',
];

type ShuffleItem = {
  name: string,
  index: string,
  isClickable: boolean
};
const mapStateToProps = (
  state: IState
): Pick<IAccountState['create'], 'mnemonic'> =>
  pick(['mnemonic'], selectAccountCreate(state));

const mapDispatchToProps = {
  accountCreateSetConfirm: ACCOUNT_ACTIONS.accountCreateSetConfirm,
  accountSetCreateStage: ACCOUNT_ACTIONS.accountSetCreateStage,
  accountCreateCancel: ACCOUNT_ACTIONS.accountCreateCancel,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {};

const AccountCreateConfirmUnconnected: FC<IProps> = memo(
  ({
    accountSetCreateStage,
    accountCreateCancel,
    accountCreateSetConfirm,
    mnemonic,
  }) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [is_cancel_modal_opened, setIsCancelModalOpened] = useState(false);
    // const [shuffledMnemonic, setShuffledMnemonic] = useState([])
    const [filterSelected, setfilterSelected] = useState<Array<ShuffleItem>>([])




    const [shuffledMnemonics, setShuffledMnemonic] = useState<Array<ShuffleItem>>(
      []
    );
    const [verifyMnemonic, setVerifyMnemonic] = useState<Array<ShuffleItem>>([]);
    const [isEnable, setEnable] = useState(false);

    const [is_incorrect_modal_visible, setIsIncorrectModalVisible] = useState(
      false
    );
    const shuffled_mnemonics = useMemo(
      () => shuffle(mnemonic && mnemonic.split(' ')),
      [mnemonic]
    );

    const is_next_disabled = useMemo(() => mnemonic !== selected.join(' '), [
      mnemonic,
      selected,
    ]);

    const onBackPressed = useCallback(
      () => accountSetCreateStage(ACCOUNT_CREATION_STAGES.CREDENTIALS),
      [accountSetCreateStage]
    );


    const onSubmit = useCallback(() => {
      // if (is_next_disabled) return setIsIncorrectModalVisible(true);
      if (verifyMnemonic && verifyMnemonic.length === 0) {
       
        setIsIncorrectModalVisible(true)
        return;

      }
      let inconsistency = "";
  
      const verifyMnemonicArr = verifyMnemonic.map(obj => obj.name.toLowerCase());
  
      mnemonic.split(" ").some((word, index) => {
        if (word === verifyMnemonicArr[index]) return false;
        inconsistency = ENUM_WORD[index];
        return true;
      });
  
      if (inconsistency !== "") {
        setIsIncorrectModalVisible(true)
        
        return;
      }

      accountCreateSetConfirm();
    }, [verifyMnemonic, mnemonic, accountCreateSetConfirm]);

    // const onMnemonicRemove = useCallback(
    //   item => () => {
    //     setSelected(selected.filter(el => el !== item));
    //   },
    //   [setSelected, selected]
    // );

    // const onMnemonicSelect = useCallback(
    //   item => () => {
    //     setSelected([...selected, item.name]);
    //     const newArr = filterSelected.push(item)
    //     setfilterSelected(newArr)
    //   },
    //   [selected, filterSelected]
    // );


    
  const onMnemonicSelect = ({ name, index }) => {
    setVerifyMnemonic([
      ...verifyMnemonic.slice(),
      { name, index, isClickable: false },
    ]);

    setShuffledMnemonic(
      shuffledMnemonics.map(item => ({
        ...item,
        isClickable: item.index !== index ? item.isClickable : false,
      }))
    );
  };

  const onMnemonicRemove = ({ name, index })  => {
    setVerifyMnemonic(verifyMnemonic.filter(word => word.index !== index));
    setShuffledMnemonic(
      shuffledMnemonics.map(word => ({
        ...word,
        ...(name === word.name ? { isClickable: true } : {}),
      }))
    );
  };


    useEffect(() => {
      if (!mnemonic) onBackPressed();
        const filteredArr: any = [];
      shuffled_mnemonics.forEach((word, index) => {
        const obj = {
          name: word,
          index: `${word}_${index}`,
          isClickable: true,

        }
        filteredArr.push(obj)
      })
      setShuffledMnemonic(filteredArr)

    }, [mnemonic, onBackPressed, shuffled_mnemonics]);

   

    
  useEffect(() => {
    if (verifyMnemonic && verifyMnemonic.length > 0) {

      const verifyMnemonicArr = verifyMnemonic.map(obj =>
        obj.name.toLowerCase()
      );
      const mnemonicString = mnemonic
        .split(" ")
        .slice(0, verifyMnemonicArr.length)
        .join();

      if (mnemonicString === verifyMnemonicArr.join()) setEnable(false);
      else setEnable(true);
      return;
    }
    setEnable(false);
  }, [mnemonic, verifyMnemonic]);

  console.log('*****ver', isEnable)
   

   
const isBtnDisabled = verifyMnemonic && verifyMnemonic.length > 0 && verifyMnemonic.length === 12

    return (
      <Layout>
        <div>
          <CreateWalletCard>
            <Verification />
            {is_incorrect_modal_visible && (
              <p className={styles.incorrect_mnemonic}>
                Incorrect mnemonic phrase order. Please try again.
              </p>
            )}
            <div className={styles.phraseContent}>
              {/* <MnemonicPhrase mnemonic={mnemonic.split(" ")} /> */}
              <MnemonicPhraseEmpty
                selected={verifyMnemonic}
                onMnemonicRemove={onMnemonicRemove}
              />
              {/* <MnemonicPhraseWithCross /> */}
              <MnemonicButtons
                mnemonic={shuffledMnemonics}
                selected={verifyMnemonic}
                onMnemonicSelect={onMnemonicSelect}
              />
            </div>
            <div className={styles.verifyBtnWrapper}>
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={onBackPressed}
              >
                Back
              </button>

              <Button
                color={is_next_disabled ? 'secondary' : 'topaz'}
                className={classnames('ml-2', {
                  outlined: !is_next_disabled,
                  'text-dark-grey-blue': !is_next_disabled,
                })}
                onClick={onSubmit}
                disabled={!isBtnDisabled}
              >
                Verify
              </Button>
            </div>
          </CreateWalletCard>
        </div>
      </Layout>
      // <div>
      //   <AccountCreateProcess stepNo={3} />

      //   <section className={styles.content}>
      //     <Container>
      //       <Row>
      //         <Col>
      //           <div className={styles.mnemonics}>
      //             <h2>Enter your mnemonics in the correct order to create your account below</h2>

      //             <Row className={styles.selectors}>
      //               <Col>
      //                 <div className={styles.mnemonic_container}>
      //                   {selected.map(item => (
      //                     <div key={item} className={styles.item}>
      //                       <Button color="primary" onClick={onMnemonicRemove(item)}>
      //                         {item}
      //                       </Button>
      //                     </div>
      //                   ))}
      //                 </div>

      //                 <div className={styles.mnemonic_selector}>
      //                   {shuffled_mnemonics.map(item => (
      //                     <div key={item} className={styles.item}>
      //                       <Button
      //                         color="primary"
      //                         onClick={onMnemonicSelect(item)}
      //                         disabled={selected.includes(item)}
      //                       >
      //                         {item}
      //                       </Button>
      //                     </div>
      //                   ))}
      //                 </div>
      //               </Col>
      //             </Row>
      //             <div className={styles.buttons}>
      //               <Button color="primary bordered" onClick={onSubmit}>
      //                 Create Wallet
      //               </Button>
      //               <Button className="secondary bordered" onClick={onCancelModalOpen}>
      //                 Cancel
      //               </Button>
      //             </div>
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
    );
  }
);

const AccountCreateConfirm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCreateConfirmUnconnected);

export { AccountCreateConfirm, AccountCreateConfirmUnconnected };
