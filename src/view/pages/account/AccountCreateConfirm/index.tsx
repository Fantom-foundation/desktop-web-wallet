/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {withRouter, RouteComponentProps} from 'react-router'
import { connect } from 'react-redux';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { ACCOUNT_CREATION_STAGES, IAccountState } from '~/redux/account';
import { Push } from 'connected-react-router';

import shuffle from 'lodash/shuffle';
import styles from './styles.module.scss';
import { pick } from 'ramda';
import { IState } from '~/redux/store';
import Verification from '../../verification';
import classnames from 'classnames';
import { Layout } from '~/view/components/layout/Layout';
import { useTranslation } from "react-i18next";

import {
  MnemonicPhraseEmpty,
  MnemonicButtons,
} from 'src/view/components/mnemonic';
import { CreateWalletCard } from '../../../components/cards';
import {  Button } from 'reactstrap';

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
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
  "twenty-one",
  "twenty-two",
  "twenty-three",
  "twenty-four",
];

type ShuffleItem = {
  name: string;
  index: string;
  isClickable: boolean;
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
typeof mapDispatchToProps &
RouteComponentProps & {
  push: Push
};

 
const AccountCreateConfirmUnconnected: FC<IProps> = 
  ({
    accountSetCreateStage,
    accountCreateSetConfirm,
    mnemonic,
    history,
  }) => {
    const [selected, setSelected] = useState<string[]>([]);
   

    const [shuffledMnemonics, setShuffledMnemonic] = useState<
      Array<ShuffleItem>
    >([]);
    const [verifyMnemonic, setVerifyMnemonic] = useState<Array<ShuffleItem>>(
      []
    );

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
        setIsIncorrectModalVisible(true);
        return;
      }
      let inconsistency = '';

      const verifyMnemonicArr = verifyMnemonic.map(obj =>
        obj.name.toLowerCase()
      );

      (mnemonic || '').split(' ').some((word, index) => {
        if (word === verifyMnemonicArr[index]) return false;
        inconsistency = ENUM_WORD[index];
        return true;
      });

      if (inconsistency !== '') {
        setIsIncorrectModalVisible(true);

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

    const onMnemonicRemove = ({ name, index }) => {
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
        };
        filteredArr.push(obj);
      });
      setShuffledMnemonic(filteredArr);
    }, [mnemonic, onBackPressed, shuffled_mnemonics]);



    const isActive = () => {
      if (verifyMnemonic && verifyMnemonic.length === 24) {
        return true;
      }
      return false;
    };


    const handleClose = () => {
      history.push('/')
    };
      const { t } = useTranslation();


    return (
      <Layout>
        <div>
          <CreateWalletCard
            className=""
            handleClose={() => handleClose()}
            title={t("createNewWallet")}
          >
            <Verification t={t} />
            {is_incorrect_modal_visible && (
              <p className={styles.incorrect_mnemonic}>
                {t("incorrectMnemonicPhrase")}
              </p>
            )}
            <div className={styles.phraseContent}>
              <MnemonicPhraseEmpty
                selected={verifyMnemonic}
                onMnemonicRemove={onMnemonicRemove}
              />
              <MnemonicButtons
                mnemonic={shuffledMnemonics}
                onMnemonicSelect={onMnemonicSelect}
              />
            </div>
            <div className={styles.verifyBtnWrapper}>
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={onBackPressed}
              >
                {t("back")}
              </button>

              <Button
                color={!isActive() ? 'secondary' : 'topaz'}
                className={classnames('ml-2', {
                  outlined: isActive(),
                  'text-dark-grey-blue': isActive(),
                })}
                onClick={onSubmit}
                disabled={!isActive()}
              >
                {t("verify")}
              </Button>
            </div>
          </CreateWalletCard>
        </div>
      </Layout>
     
    );
  }


const AccountCreateConfirm = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountCreateConfirmUnconnected));

export { AccountCreateConfirm, AccountCreateConfirmUnconnected };
