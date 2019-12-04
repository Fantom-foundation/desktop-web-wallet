import {
  takeLatest,
  put,
  select,
  call,
  delay,
  takeEvery,
  race,
  fork,
} from 'redux-saga/effects';
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
  accountSendFunds,
  accountSetTransferErrors,
  accountSetTransfer,
  accountGetTransferFee,
  accountUploadKeystore,
  accountSetConnection,
  accountChangeProvider,
  accountProviderConnected,
  accountReconnectProvider,
} from './actions';
import {
  ACCOUNT_CREATION_STAGES,
  IAccountState,
  ACCOUNT_INITIAL_STATE,
} from '.';
import bip from 'bip39';
import {
  selectAccountCreate,
  selectAccount,
  selectAccountConnection,
} from './selectors';
import { push } from 'connected-react-router';
import { URLS } from '~/constants/urls';
import { Fantom, DEFAULT_PROVIDERS } from '~/utility/web3';
import { fromWei } from 'web3-utils';
import { validateAccountTransaction } from './validators';
import { readFileAsJSON } from '~/utility/filereader';
import { EncryptedKeystoreV3Json } from 'web3-core';
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { path } from 'ramda';

function* createSetCredentials({
  create,
}: ReturnType<typeof accountCreateSetCredentials>) {
  const mnemonic: string = bip.generateMnemonic();
  const { publicAddress } = Fantom.mnemonicToKeys(mnemonic);

  yield put(
    accountSetCreate({
      ...create,
      stage: ACCOUNT_CREATION_STAGES.INFO,
      publicAddress,
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
  const {
    mnemonic,
    password,
    name,
    icon,
    publicAddress,
  }: IAccountState['create'] = yield select(selectAccountCreate);

  if (!name || !password || !icon || !publicAddress || !mnemonic)
    return yield put(accountSetCreate(ACCOUNT_INITIAL_STATE.create));

  const { privateKey } = Fantom.mnemonicToKeys(mnemonic);
  const keystore = Fantom.getKeystore(privateKey, password);

  yield put(
    accountAddAccount({
      ...EMPTY_ACCOUNT,
      name,
      icon,
      keystore,
      publicAddress,
    })
  );
  yield put(push(URLS.ACCOUNT_LIST));
}

function* createCancel() {
  yield put(accountCreateClear());
  yield put(push('/'));
}

function* createRestoreMnemonics({
  mnemonic,
}: ReturnType<typeof accountCreateRestoreMnemonics>) {
  const { publicAddress } = Fantom.mnemonicToKeys(mnemonic);

  yield put(accountSetCreate({ mnemonic, publicAddress }));
  yield call(createSetConfirm);
}

function* getBalance({ id }: ReturnType<typeof accountGetBalance>) {
  try {
    const { list } = yield select(selectAccount);

    if (!id || !list[id]) {
      return;
    }

    yield put(
      accountSetAccount(id, {
        is_loading_balance: true,
      })
    );

    const result = yield call([Fantom, Fantom.getBalance], id);

    if (!result)
      return accountSetAccount(id, {
        is_loading_balance: false,
      });

    const balance = fromWei(result);

    yield put(
      accountSetAccount(id, {
        balance,
        is_loading_balance: false,
      })
    );
  } catch (e) {
    yield put(
      accountSetAccount(id, {
        is_loading_balance: false,
      })
    );
  }
}

function* sendFunds({
  from,
  to,
  amount,
  password,
  message,
}: ReturnType<typeof accountSendFunds>) {
  yield put(accountSetTransferErrors({}));

  yield call(getBalance, accountGetBalance(from));

  const { list }: IAccountState = yield select(selectAccount);

  if (!Object.prototype.hasOwnProperty.call(list, from))
    return yield put(
      accountSetTransferErrors({ from: 'Not a correct sender' })
    );

  const { keystore, balance } = list[from];

  const privateKey = yield call(
    [Fantom, Fantom.getPrivateKey],
    keystore,
    password
  );

  const fee: string = yield call([Fantom, Fantom.estimateFee], {
    from,
    to,
    value: amount.toString(),
    memo: message,
  });

  const validation_errors = validateAccountTransaction({
    from,
    to,
    privateKey,
    balance,
    fee,
    amount,
  });

  if (Object.keys(validation_errors).length)
    return yield put(accountSetTransferErrors(validation_errors));

  try {
    yield put(accountSetTransfer({ is_processing: true }));
    yield call([Fantom, Fantom.transfer], {
      from,
      to,
      value: amount.toString(),
      memo: message,
      privateKey,
    });

    yield put(
      accountSetTransfer({ ...ACCOUNT_INITIAL_STATE.transfer, is_sent: true })
    );
    yield call(getBalance, accountGetBalance(from));
  } catch (e) {
    yield put(
      accountSetTransfer({
        is_processing: false,
        errors: { send: e.toString() },
      })
    );
  }
}

// This export is used for testing
export const ACCOUNT_SAGAS = {
  createSetCredentials,
  createSetConfirm,
  createCancel,
  createRestoreMnemonics,
  getBalance,
  sendFunds,
};

function* getFee({
  from,
  to,
  amount,
  message,
}: ReturnType<typeof accountGetTransferFee>) {
  yield delay(300);

  try {
    const fee: string = yield call([Fantom, Fantom.estimateFee], {
      from,
      to,
      value: amount.toString(),
      memo: message,
    });

    yield put(accountSetTransfer({ fee }));
  } catch (e) {
    console.log(e);
  }
}

function* uploadKeystore({ file }: ReturnType<typeof accountUploadKeystore>) {
  try {
    yield put(accountSetCreate({ errors: {} }));

    const { password, name, icon } = yield select(selectAccountCreate);
    const { list }: IAccountState = yield select(selectAccount);
    const keystore: EncryptedKeystoreV3Json = yield call(readFileAsJSON, file);

    if (!keystore)
      return put(
        accountSetCreate({ errors: { keystore: 'Not a valid keystore file' } })
      );

    const result = Fantom.validateKeystore(keystore, password);

    if (!result)
      return yield put(
        accountSetCreate({
          errors: { keystore: "Password doesn't match keystore file" },
        })
      );

    if (Object.keys(list).includes(`0x${keystore.address}`))
      return yield put(
        accountSetCreate({
          errors: {
            keystore: "There's already account matching this keystore",
          },
        })
      );

    yield put(
      accountAddAccount({
        ...EMPTY_ACCOUNT,
        name,
        icon,
        keystore,
        publicAddress: `0x${keystore.address}`,
      })
    );

    yield put(push(URLS.ACCOUNT_LIST));
  } catch (e) {
    yield put(
      accountSetCreate({
        errors: { keystore: 'Invalid keystore file or password.' },
      })
    );
  }
}

function* connectToNewProvider(current_node: number) {
  yield put(
    accountSetConnection({
      is_node_connected: false,
      error: null,
      current_node,
    })
  );

  const { custom_nodes } = yield select(selectAccountConnection);
  const nodes = [...DEFAULT_PROVIDERS, ...custom_nodes];
  const current = nodes[current_node] || nodes[0];

  const { connected, timeout } = yield race({
    connected: call([Fantom, Fantom.setProvider], current.address),
    timeout: delay(10000),
  });

  if (timeout || !connected) {
    return yield put(
      accountSetConnection({
        is_node_connected: false,
        error: 'Could not connect to node',
      })
    );
  }

  yield put(accountSetConnection({ is_node_connected: true, error: null }));
  yield put(accountProviderConnected());
}

function* connectToNode({ key, payload }: RehydrateAction) {
  if (key !== 'account') return;

  const current_node = path(['connection', 'current_node'], payload) || 0;

  yield call(connectToNewProvider, current_node);
}

function* changeProvider({
  provider,
}: ReturnType<typeof accountChangeProvider>) {
  yield call(connectToNewProvider, provider);
}

function* reconnectProvider() {
  yield delay(3000);
  const { current_node } = yield select(selectAccountConnection);
  yield call(connectToNewProvider, current_node);
}

function* testConnectionSaga() {
  try {
    const { is_node_connected } = yield select(selectAccountConnection);
  
    if (!is_node_connected) return;
    
    const { connected } = yield race({
      connected: call([Fantom, Fantom.isConnected]),
      timeout: delay(10000),
    });

    if (connected) return;

    yield put(accountSetConnection({ is_node_connected: false }));
    yield put(accountReconnectProvider());
  } finally {
    yield delay(10000);
    yield call(testConnectionSaga);
  }
}

export function* accountSaga() {
  yield fork(testConnectionSaga);
  yield takeEvery(REHYDRATE, connectToNode);

  yield takeLatest(
    ACCOUNT_ACTIONS.CREATE_SET_CREDENTIALS,
    createSetCredentials
  );
  yield takeLatest(
    ACCOUNT_ACTIONS.CREATE_SET_RESTORE_CREDENTIALS,
    createSetRestoreCredentials
  );
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_INFO, createSetInfo);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_CONFIRM, createSetConfirm);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_CANCEL, createCancel);
  yield takeLatest(
    ACCOUNT_ACTIONS.CREATE_RESTORE_MNEMONICS,
    createRestoreMnemonics
  );

  yield takeLatest(ACCOUNT_ACTIONS.GET_BALANCE, getBalance);

  yield takeLatest(ACCOUNT_ACTIONS.SEND_FUNDS, sendFunds);
  yield takeLatest(ACCOUNT_ACTIONS.GET_TRANSFER_FEE, getFee);
  yield takeLatest(ACCOUNT_ACTIONS.UPLOAD_KEYSTORE, uploadKeystore);

  yield takeLatest(ACCOUNT_ACTIONS.CHANGE_PROVIDER, changeProvider);
  yield takeLatest(ACCOUNT_ACTIONS.RECONNECT_PROVIDER, reconnectProvider);
}
