// @flow
import { takeLatest, put, select, call } from "redux-saga/effects";
import {
  STAKE_ACTIONS,
  delegateByAddress,
  delegateByAddressesFailure,
  delegateByStakerId,
  delegateAmount,
} from "./actions";
// import { setDopdownAlert } from "~/redux/notification/actions";
import { getDataWithQueryString } from "../../api";
import { Fantom } from '~/utility/web3';

type Action = {
  payload: {
    mnemonic: string,
    cb: (publicKey: string) => void
    publicKey?: string,
    stakerId?: string,
    amount?: string
  }
};

type TDelegate = {
  payload: {
    publicKey: string
  }
}

export function* delegateByAddressSaga({
  payload: { publicKey },
}: ReturnType<typeof delegateByAddress>) {
  try {
    const res = yield call(fetch, `http://3.136.216.35:3100/api/v1/delegator/address/${publicKey}`)
  const data = yield call([res, 'json'])
  return data
    // yield call(
    //   getDataWithQueryString("delegatorByAddress", publicKey)
    // );
  } catch (e) {
    // yield put(setDopdownAlert("error", e.message));
  }
}

const delegatorByAddressApi = async publicKey => {
  return getDataWithQueryString("delegatorByAddress", `${publicKey}`);
};

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
    const res = yield call(fetch, `http://3.136.216.35:3100/api/v1/delegator/staker/${stakerId}`)
    const data = yield call([res, 'json'])
  //  yield call(
  //     getDataWithQueryString("delegatorByStakerId", stakerId)
  //   );
  } catch (e) {
    // yield put(setDopdownAlert("error", e.message));
  }
}

export function* delegateAmountSaga({
  payload: { amount, publicKey },
}: ReturnType<typeof delegateAmount>) {
  try {
     yield Fantom.delegateStake({
      amount,
      publicKey,
    });
    // Assign contract functions to sfc variable
  } catch (e) {
    // yield put(setDopdownAlert("error", e.message));
  }
}

export function* listener() {
  yield takeLatest(STAKE_ACTIONS.DELEGATE_BY_ADDRESS, delegateByAddressSaga);
  yield takeLatest(STAKE_ACTIONS.DELEGATE_BY_ADDRESSES, delegateByAddressesSaga);
  yield takeLatest(STAKE_ACTIONS.DELEGATE_BY_STAKER_ID, delegateByStakerIdSaga);
  yield takeLatest(STAKE_ACTIONS.DELEGATE_AMOUNT, delegateAmountSaga);
}

