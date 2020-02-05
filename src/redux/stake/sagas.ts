/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// @flow
import {
  takeLatest,
  takeEvery,
  put,
  select,
  call,
  all,
} from 'redux-saga/effects';
import {
  STAKE_ACTIONS,
  delegateByAddress,
  delegateByStakerId,
  delegateAmount,
  delegateByAddressSuccess,
  delegateByAddressFailure,
  delegateByAddressesFailure,
  unstakeamount,
  setAmountUnstaked,
  delegateAmountSuccess,
  delegateAmountError,
  withdrawAmount,
  withdrawAmountPassCheck,
} from './actions';
import { selectAccount } from '../account/selectors';
import {} from './handlers';
import { IAccountState } from '../account';
// import { setDopdownAlert } from "~/redux/notification/actions";
import { getDataWithQueryString } from '../../api';
// import { Fantom } from '~/utility/web3';
import Fantom, { delegateStake, delegateUnstake, withdrawDelegateAmount }  from 'web3-functions'

const delegatorByAddressApi = async publicKey => {
  return getDataWithQueryString(
    'delegatorByAddress',
    `${publicKey}?verbosity=2`
  );
};

type Action = {
  payload: {
    mnemonic: string;
    cb: (publicKey: string) => void;
    publicKey?: string;
    stakerId?: string;
    amount?: string;
  };
};

type TDelegate = {
  payload: {
    publicKey: string;
  };
};

function* delegateByAddressSaga({
  publicKey,
}: ReturnType<typeof delegateByAddress>) {
  try {
    const { pendingRewards, data } = yield Fantom.getDelegationPendingRewards(
      publicKey,
      publicKey
    );

    const delegatorResponse = yield call(delegatorByAddressApi, publicKey);

    const {
      address,
      amount,
      claimedRewards,
      createdEpoch,
      createdTime,
      toStakerID,
    } = delegatorResponse.data.data;
    const { deactivatedEpoch, deactivatedTime, paidUntilEpoch } = data;
    const response = {
      address,
      amount,
      claimedRewards,
      createdEpoch,
      createdTime,
      toStakerID,
      deactivatedEpoch,
      deactivatedTime,
      paidUntilEpoch,
      pendingRewards: pendingRewards || 0,
    };

    yield put(delegateByAddressSuccess(response));

    // yield call(
    //   getDataWithQueryString("delegatorByAddress", publicKey)
    // );
  } catch (e) {
    console.log('******error', e)
    yield put(delegateByAddressFailure({ publicKey }));
  }
}

export function* delegateByAddressesSaga() {
  const { walletsData } = yield select(({ keys, wallet }) => ({
    keys,
    walletsData: wallet.walletsData,
  }));
  if (walletsData && walletsData.length > 0) {
    for (let i = 0; i < walletsData.length; i++) {
      const wallet = walletsData[i];
      const { publicKey } = wallet;
      if (publicKey) {
        try {
          // const response = yield call(delegatorByAddressApi, publicKey);
          yield put(delegateByAddressesFailure({ publicKey }));
        } catch (exception) {
          yield put(delegateByAddressesFailure({ publicKey }));
        }
      }
    }
  }
}

export function* delegateByStakerIdSaga({
  payload: { stakerId },
}: ReturnType<typeof delegateByStakerId>) {
  try {
    const res = yield call(
      fetch,
      `${process.env.REACT_APP_API_URL_FANTOM}api/v1/delegator/staker/${stakerId}`
    );
    const data = yield call([res, 'json']);
    //  yield call(
    //     getDataWithQueryString("delegatorByStakerId", stakerId)
    //   );
  } catch (e) {
    // yield put(setDopdownAlert("error", e.message));
  }
}

export function* delegateAmountSaga({
  publicKey,
  amount,
  validatorId,
  password,
  cb,
}: ReturnType<typeof delegateAmount>) {
  try {
    const { list }: IAccountState = yield select(selectAccount);

    const { keystore } = list[publicKey];
    const privateKey = yield call(
      [Fantom, Fantom.getPrivateKey],
      keystore,
      password
    );
    if (!privateKey) {
      cb(true);
      yield put(delegateAmountError());
      return;
    }
    yield call(delegateStake, {
      amount,
      publicKey,
      privateKey,
      validatorId,
      isWeb:true,
    });
    yield put(delegateAmountSuccess({ response: {} }));
    cb(false);
    // Assign contract functions to sfc variable
  } catch (e) {
    cb(true);
    console.log('called catch', e);
  }
}

export function* delegateAmountSagaPasswordCheck({
  publicKey,
  password,
  cb,
}: ReturnType<typeof delegateAmount>) {
  try {
    const { list }: IAccountState = yield select(selectAccount);

    const { keystore } = list[publicKey];
    const privateKey = yield call(
      [Fantom, Fantom.getPrivateKey],
      keystore,
      password
    );
    if (!privateKey) {
      cb(true);
      yield put(delegateAmountError());
      return;
    }
    cb(false);
    // Assign contract functions to sfc variable
  } catch (e) {
    cb(true);
    console.log('called catch', e);
  }
}

export function* unstakeAmountSaga({
  publicKey,
  password,
  cb,
}: ReturnType<typeof unstakeamount>) {
  try {
    const { list }: IAccountState = yield select(selectAccount);

    const { keystore } = list[publicKey];
    const privateKey = yield call(
      [Fantom, Fantom.getPrivateKey],
      keystore,
      password
    );

    const res = yield call(
      delegateUnstake,
      publicKey,
      privateKey,
      true
    );
    yield put(setAmountUnstaked({ publicKey }));
    cb(true)
    // Assign contract functions to sfc variable
  } catch (e) {
    cb(false)
    
    // yield put(setDopdownAlert("error", e.message));
  }
}

export function* withdrawAmountSaga({
  publicKey,
  password,
  cb,
}: ReturnType<typeof withdrawAmount>) {
  try {
    const { list }: IAccountState = yield select(selectAccount);

    const { keystore } = list[publicKey];
    const privateKey = yield call(
      [Fantom, Fantom.getPrivateKey],
      keystore,
      password
    );

    const res = yield call(
      withdrawDelegateAmount,
      publicKey,
      privateKey,
      true
    );
    console.log('withdrawAmountSaga response', res);
    if(res){
      cb(true)
    } else {
      cb(false)
    }

    // Assign contract functions to sfc variable
  } catch (e) {
    cb(false)
    console.log('withdrawAmountSaga', e);
  }
}


export function* withdrawAmountPasswordCheckSaga({
  publicKey,
  password,
  cb,
}: ReturnType<typeof withdrawAmountPassCheck>) {
  try {
    const { list }: IAccountState = yield select(selectAccount);

    const { keystore } = list[publicKey];
    const privateKey = yield call(
      [Fantom, Fantom.getPrivateKey],
      keystore,
      password
    );

    if (!privateKey) {
      cb(true);
      // yield put(delegateAmountError());
      return;
    } 
      cb(false)
    
    // Assign contract functions to sfc variable
  } catch (e) {
    console.log('withdrawAmountSaga', e);
  }
}

export default function* stakeSaga() {
  yield all([
    yield takeEvery(STAKE_ACTIONS.DELEGATE_BY_ADDRESS, delegateByAddressSaga),
    yield takeLatest(
      STAKE_ACTIONS.DELEGATE_BY_ADDRESSES,
      delegateByAddressesSaga
    ),
    yield takeLatest(
      STAKE_ACTIONS.DELEGATE_BY_STAKER_ID,
      delegateByStakerIdSaga
    ),
    yield takeLatest(STAKE_ACTIONS.DELEGATE_AMOUNT, delegateAmountSaga),
    yield takeLatest(
      STAKE_ACTIONS.DELEGATE_AMOUNT_PASS_CHECK,
      delegateAmountSagaPasswordCheck
    ),

    yield takeLatest(STAKE_ACTIONS.UNSTAKE_AMOUNT, unstakeAmountSaga),
    yield takeLatest(STAKE_ACTIONS.WITHDRAW_AMOUNT, withdrawAmountSaga),
    yield takeLatest(STAKE_ACTIONS.WITHDRAW_AMOUNT_PASS_CHECK, withdrawAmountPasswordCheckSaga),

  ]);
}
