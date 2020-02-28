// // @flow

import { createReducer } from '~/utility/createReducer';
import { ACCOUNT_HANDLERS } from './handlers';

export type TStakeObj = {
  publicKey: string;
  amount: number;
  claimedRewards: number;
  pendingRewards: number;
  isDeligated: boolean;
  isAmountUnstaked: boolean;
  stakedAmount: string;
  toStakerID: string;
  deactivatedEpoch: string;
  deactivatedTime: string;
};
export type TValidatorObj = {
  publicKey: string;
  amount: number;
  claimedRewards: number;
};

export interface InitialStateType {
  data: Array<TStakeObj>;
  validators: Array<TValidatorObj>;
  errors: boolean;
}

export const MODAL_INITIAL_STATE: InitialStateType = {
  data: [],
  validators: [],
  errors: false,
};

export const stakes = createReducer(MODAL_INITIAL_STATE, ACCOUNT_HANDLERS);

