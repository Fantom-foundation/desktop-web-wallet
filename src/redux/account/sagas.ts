import { takeLatest, put, select, call } from 'redux-saga/effects';
import { ACCOUNT_ACTIONS, EMPTY_ACCOUNT } from './constants';
import {
  accountCreateSetCredentials,
  accountSetCreate,
  accountSetCreateStage,
  accountAddAccount,
  accountCreateSetRestoreCredentials,
  accountCreateClear,
  accountCreateRestoreMnemonics,
  accountGetBalance,
  accountSetAccount,
} from './actions';
import { ACCOUNT_CREATION_STAGES, IAccountState, ACCOUNT_INITIAL_STATE } from '.';
import { accountMnemonicToKeys } from '~/utility/account';
import bip from 'bip39';
import { selectAccountCreate, selectAccount } from './selectors';
import { push } from 'connected-react-router';
import { URLS } from '~/constants/urls';
import { Fantom } from '~/utility/web3';
import { fromWei } from 'web3-utils';

function* createSetCredentials({ create }: ReturnType<typeof accountCreateSetCredentials>) {
  const mnemonic: string = bip.generateMnemonic();
  const { publicAddress: public_address } = accountMnemonicToKeys(mnemonic);

  yield put(
    accountSetCreate({
      ...create,
      stage: ACCOUNT_CREATION_STAGES.INFO,
      public_address,
      mnemonic,
    })
  );
}

function* createSetRestoreCredentials({
  create,
}: ReturnType<typeof accountCreateSetRestoreCredentials>) {
  yield put(
    accountSetCreate({
      ...create,
      stage: ACCOUNT_CREATION_STAGES.INFO,
    })
  );
}

function* createSetInfo() {
  yield put(accountSetCreateStage(ACCOUNT_CREATION_STAGES.CONFIRM));
}

function* createSetConfirm() {
  const { mnemonic, password, name, icon, public_address }: IAccountState['create'] = yield select(
    selectAccountCreate
  );

  if (!name || !password || !icon || !public_address || !mnemonic)
    return yield put(accountSetCreate(ACCOUNT_INITIAL_STATE.create));

  const keys = Fantom.mnemonicToKeys(mnemonic);
  const keystore = Fantom.getKestore(keys.privateKey, password);

  yield put(
    accountAddAccount({
      ...EMPTY_ACCOUNT,
      name,
      icon,
      keystore,
      public_address,
    })
  );
  yield put(push(URLS.ACCOUNT_LIST));
}

function* createCancel() {
  yield put(accountCreateClear());
  yield put(push('/'));
}

function* createRestoreMnemonics({ mnemonic }: ReturnType<typeof accountCreateRestoreMnemonics>) {
  const { publicAddress: public_address } = Fantom.mnemonicToKeys(mnemonic);

  yield put(accountSetCreate({ mnemonic, public_address }));
  yield call(createSetConfirm);
}

function* getBalance({ id }: ReturnType<typeof accountGetBalance>) {
  try {
    yield put(
      accountSetAccount(id, {
        is_loading_balance: true,
      })
    );

    const { list } = yield select(selectAccount);
    
    if (!id || !list[id]) return;
    
    const result = yield call(Fantom.getBalance.bind(Fantom), id);
    
    if (!result) return;
    const balance = parseFloat(parseFloat(fromWei(result)).toFixed(4));
    
    yield put(
      accountSetAccount(id, {
      balance,
    })
    );
  } finally {
    yield put(
      accountSetAccount(id, {
        is_loading_balance: false,
      })
    );
  }
}

export function* accountSaga() {
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_CREDENTIALS, createSetCredentials);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_RESTORE_CREDENTIALS, createSetRestoreCredentials);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_INFO, createSetInfo);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_CONFIRM, createSetConfirm);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_CANCEL, createCancel);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_RESTORE_MNEMONICS, createRestoreMnemonics);

  yield takeLatest(ACCOUNT_ACTIONS.GET_BALANCE, getBalance);
}
