import { takeLatest, put } from 'redux-saga/effects';
import { ACCOUNT_ACTIONS } from './constants';
import { accountCreateSetCredentials, accountSetCreate } from './actions';
import { ACCOUNT_CREATION_STAGES } from '.';
import { accountMnemonicToKeys } from '~/utility/account';
import bip from 'bip39';

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

export function* accountSaga() {
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_CREDENTIALS, createSetCredentials);
}
