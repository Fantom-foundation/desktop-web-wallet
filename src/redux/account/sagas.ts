import { takeLatest, put, select } from 'redux-saga/effects';
import { ACCOUNT_ACTIONS } from './constants';
import {
  accountCreateSetCredentials,
  accountSetCreate,
  accountSetCreateStage,
  accountAddAccount,
} from './actions';
import { ACCOUNT_CREATION_STAGES, IAccountState, ACCOUNT_INITIAL_STATE } from '.';
import { accountMnemonicToKeys, getWeb3Keystore } from '~/utility/account';
import bip from 'bip39';
import { selectAccountCreate } from './selectors';
import { push } from 'connected-react-router';
import { URLS } from '~/constants/urls';

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

function* createSetInfo() {
  yield put(accountSetCreateStage(ACCOUNT_CREATION_STAGES.CONFIRM));
}

function* createSetConfirm() {
  const { mnemonic, password, name, icon, public_address }: IAccountState['create'] = yield select(
    selectAccountCreate
  );

  console.log({ name, password, icon, mnemonic, public_address });

  if (!name || !password || !icon || !public_address || !mnemonic)
    return yield put(accountSetCreate(ACCOUNT_INITIAL_STATE.create));

  const keys = accountMnemonicToKeys(mnemonic);
  const keystore = getWeb3Keystore(keys.privateKey, password);

  yield put(
    accountAddAccount({
      name,
      icon,
      keystore,
      public_address,
    })
  );
  yield put(push(URLS.ACCOUNT_LIST));
}

function* createCancel() {
  yield put(accountSetCreate(ACCOUNT_INITIAL_STATE.create));
  yield put(push('/'));
}

export function* accountSaga() {
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_CREDENTIALS, createSetCredentials);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_INFO, createSetInfo);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_CONFIRM, createSetConfirm);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_CANCEL, createCancel);
}
