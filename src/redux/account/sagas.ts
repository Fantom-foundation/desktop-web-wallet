/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  takeLatest,
  put,
  select,
  apply,
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
  accountSetFTMtoUSD,
  accountUploadKeystore,
  accountSetConnection,
  accountChangeProvider,
  accountProviderConnected,
  accountReconnectProvider,
  accountGetPrivateKey,
  accountSendPasswordCheck,
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
import axios from 'axios';
import { getTransactions } from '../transactions/api';
import fileDownload from 'js-file-download'

function* createSetCredentials({
  create,
}: ReturnType<typeof accountCreateSetCredentials>) {
  const mnemonic: string = bip.generateMnemonic();
  const { publicAddress } = Fantom.mnemonicToKeys(mnemonic);
  const { privateKey } = Fantom.mnemonicToKeys(mnemonic);
  console.log('(*****create', create)
  const pass = create.password || ''

  const keystore = Fantom.getKeystore(privateKey, pass);
  const dateTime = new Date();
  const fileName = `UTC--${dateTime.toISOString()} -- ${publicAddress}`;
  fileDownload(JSON.stringify(keystore), `${fileName}.json`);

  yield put(
    accountSetCreate({
      ...create,
      stage: ACCOUNT_CREATION_STAGES.INFO,
      publicAddress,
      mnemonic,
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
    icon,
    publicAddress,
  }: IAccountState['create'] = yield select(selectAccountCreate);

  if (!password || !publicAddress || !mnemonic)
    return yield put(accountSetCreate(ACCOUNT_INITIAL_STATE.create));

  const { privateKey } = Fantom.mnemonicToKeys(mnemonic);
  const keystore = Fantom.getKeystore(privateKey, password);

  yield put(
    accountAddAccount({
      ...EMPTY_ACCOUNT,
      icon,
      keystore,
      publicAddress,
    })
  );
  yield put(push(URLS.ACCOUNT_SUCCESS));
}


function* createCancel() {
  yield put(accountCreateClear());
  yield put(push('/'));
}
function* createSetRestoreCredentials({
  create,
}: ReturnType<typeof accountCreateSetRestoreCredentials>) {
  console.log('****askdjkasd', create)
  try {
    
  yield put(
    accountSetCreate({
      ...create,
      // stage: ACCOUNT_CREATION_STAGES.INFO,
    })
  );
  const mnemonic = localStorage.getItem("mnemonic") || ''
  console.log('****asdasd', mnemonic)
  const { privateKey, publicAddress } = Fantom.mnemonicToKeys(mnemonic);
  const pass =  create.password || ''
  const keystore = Fantom.getKeystore(privateKey, pass);
  const dateTime = new Date();
  const fileName = `UTC--${dateTime.toISOString()} -- ${publicAddress}`;
  fileDownload(JSON.stringify(keystore), `${fileName}.json`);
  localStorage.setItem('mnemonic', '')
  yield delay(2000);
  yield call(createSetConfirm);

} catch(e) {
  console.log("restore exception: ", e)
}
 // yield put(push(URLS.ACCOUNT_SUCCESS));
}

function* createRestoreMnemonics({
  mnemonic,
}: ReturnType<typeof accountCreateRestoreMnemonics>) {
  const { publicAddress } = Fantom.mnemonicToKeys(mnemonic);
  localStorage.setItem('mnemonic', mnemonic)

  yield put(accountSetCreate({ mnemonic, publicAddress, stage: ACCOUNT_CREATION_STAGES.CREDENTIALS }  ));
  // yield call(createSetConfirm);
}

function* getPrivateKey({mnemonic,cb}: ReturnType<typeof accountGetPrivateKey>) {
  const { privateKey } = yield Fantom.mnemonicToKeys(mnemonic);
  cb(privateKey)
  // return privateKey
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

    // const result = yield call([Fantom, Fantom.getBalance], id);
    const { error, data } = yield call(getTransactions, id, 0, 10);
    if (!error && data.data && data.data.account) {
      const balanceStr = data.data.account.balance.toString();
      const balance = balanceStr;
      yield put(
        accountSetAccount(id, {
          balance,
          is_loading_balance: false,
        })
      );
    } else {
      return accountSetAccount(id, {
        balance: '0',
        is_loading_balance: false,
      });
    }
  } catch (e) {
    console.log('exception', e);
    yield put(
      accountSetAccount(id, {
        balance: '0',
        is_loading_balance: false,
      })
    );
  }
}
function* getFTMtoUSD() {
  const res = yield call(
    fetch,
    'http://ec2-18-216-196-200.us-east-2.compute.amazonaws.com:3000/api/get-price'
  );
  const data = yield call([res, 'json']); // or yield call([res, res.json])

  const { price } = JSON.parse(data.body);
  yield put(accountSetFTMtoUSD(price));

  // const price = res && res.data && res.data.body && JSON.parse(res.data.body.price)
}

function* getFTMMarketCap({ cb }: any) {
  const res = yield call(
    fetch,
    'https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true'
    
  );
  const data = yield call([res, 'json']); // or yield call([res, res.json])

  const { usd_market_cap } = data.fantom;
  cb(usd_market_cap)

}


function* sendFunds({
  from,
  to,
  amount,
  password,
  message,
  cb,
}: ReturnType<typeof accountSendFunds>) {
  yield put(accountSetTransferErrors({}));

  yield call(getBalance, accountGetBalance(from));

  const { list }: IAccountState = yield select(selectAccount);

  if (!Object.prototype.hasOwnProperty.call(list, from)){
    cb(false)
     yield put(
      accountSetTransferErrors({ from: 'Not a correct sender' })
    );
  }
   

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
  console.log('*****validation_errors', validation_errors);

  if (Object.keys(validation_errors).length){
    cb(false)
     yield put(accountSetTransferErrors(validation_errors));

  }

  try {
    yield put(accountSetTransfer({ is_processing: true }));
    yield call([Fantom, Fantom.transfer], {
      from,
      to,
      value: amount.toString(),
      memo: message,
      privateKey,
    });
    cb(true)

    yield put(
      accountSetTransfer({ ...ACCOUNT_INITIAL_STATE.transfer, is_sent: true })
    );
    yield call(getBalance, accountGetBalance(from));
  } catch (e) {
    console.log(e, '*******error')
    yield put(
      accountSetTransfer({
        is_processing: false,
        errors: { send: e.toString() },
      })
    );
    cb(false)
  }
}

function* sendFundsPassCheck({
  from,
  to,
  amount,
  password,
  message,
  cb,
}: ReturnType<typeof accountSendPasswordCheck>) {
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

  if (!privateKey) {
    cb(true)
  } else {
    cb(false)
  }

  if (Object.keys(validation_errors).length)
    return yield put(accountSetTransferErrors(validation_errors));

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
  gasLimit,
  cb,
}: ReturnType<typeof accountGetTransferFee>) {
  // yield delay(300);

  try {
    // const fee: string = yield call(Fantom.estimateFee, {
    //   gasLimit,
    // });
    const fee = yield Fantom.getTransactionFee(gasLimit);
    if(cb){
      cb(fee)
    }

  } catch (e) {
    console.log(e);
  }
}

function* uploadKeystore({ file, password }: ReturnType<typeof accountUploadKeystore>) {
  try {
    yield put(accountSetCreate({ errors: {} }));
    console.log('**data', file, password)

    const { icon } = yield select(selectAccountCreate);
    const { list }: IAccountState = yield select(selectAccount);
    const keystore: EncryptedKeystoreV3Json = yield call(readFileAsJSON, file);
    console.log(keystore, '****8asdasds')

    if (!keystore)
      return put(
        accountSetCreate({ errors: { keystore: 'Not a valid wallet file' } })
      );

    const result = Fantom.validateKeystore(keystore, password);
    console.log('******result', result)

    if (!result)
      return yield put(
        accountSetCreate({
          errors: { keystore: "Password doesn't match keystore file" },
        })
      );
      const prevList = Object.keys(list);
      let isAddressFound = false
      if(prevList && prevList.length > 0){
        prevList.forEach(item => {
          if(item.toLowerCase() === `0x${keystore.address}`){
            isAddressFound = true
          }

        })

      }

    if (isAddressFound)
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
        icon,
        keystore,
        publicAddress: `0x${keystore.address}`,
      })
    );

    yield put(push(URLS.ACCOUNT_SUCCESS));
  } catch (e) {
    console.log('***err', e)
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
  // console.log('asdkaksd', current.address)

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

  yield takeEvery(ACCOUNT_ACTIONS.GET_BALANCE, getBalance);
  yield takeEvery(ACCOUNT_ACTIONS.GET_FTM_TO_USD, getFTMtoUSD);
  yield takeEvery(ACCOUNT_ACTIONS.GET_FTM_MARKET_CAP, getFTMMarketCap);


  yield takeLatest(ACCOUNT_ACTIONS.SEND_FUNDS, sendFunds);
  yield takeLatest(ACCOUNT_ACTIONS.SEND_FUNDS_PASS_CHECK, sendFundsPassCheck);
  yield takeLatest(ACCOUNT_ACTIONS.GET_TRANSFER_FEE, getFee);
  yield takeLatest(ACCOUNT_ACTIONS.UPLOAD_KEYSTORE, uploadKeystore);

  yield takeLatest(ACCOUNT_ACTIONS.CHANGE_PROVIDER, changeProvider);
  yield takeLatest(ACCOUNT_ACTIONS.GET_PRIVATE_KEY, getPrivateKey);


  yield takeLatest(ACCOUNT_ACTIONS.RECONNECT_PROVIDER, reconnectProvider);
}
