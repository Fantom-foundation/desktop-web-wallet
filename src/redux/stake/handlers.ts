//@ flow
import { assocPath } from 'ramda';
import {
  delegateByAddress,
  delegateByAddresses,
  getValidatorsList,
  delegateByStakerId,
  delegateAmount,
  STAKE_ACTIONS,
  getValidatorsListSuccess,
  // } from '~/redux/stake/actions';
} from './actions';
import { InitialStateType } from './index';

// const setValidators = (
//   state: InitialStateType,
//   { publicKey }: ReturnType<typeof delegateByAddressSuccess>
// ) => ({ ...state, publicKey });

export const setValidatorsList = (
  state: InitialStateType,
  { validators }: ReturnType<typeof getValidatorsListSuccess>
) => {
  console.log(validators, 'getValidatorsListSuccess');
  return { ...state, validators };

  //   return ({
  //   type: `${STAKE_ACTIONS.VALIDATORS_LIST}_SUCCESS`,
  //   payload: { response },
  // })
};

export const getValidatorsListFailure = () => ({
  type: `${STAKE_ACTIONS.VALIDATORS_LIST}_FAILURE`,
});

// export const delegateByAddressSuccess = (
//   state: InitialStateType,
//   { response }: ReturnType<typeof delegateByAddressSuccess>
// ) => {
//   console.log(response, 'aksjdgajdghajsdgh');
//   return { ...state };
// };

// export const delegateByAddressFailure = () => ({
//   type: `${STAKE_ACTIONS.DELEGATE_BY_ADDRESS}_FAILURE`,
// });

// export const delegateByAddressesSuccess = ({
//   publicKey,
// }: TDelegateByAddress) => ({
//   type: `${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_SUCCESS`,
//   payload: { publicKey },
// });

// export const delegateByAddressesFailure = ({
//   publicKey,
// }: TDelegateByAddress) => ({
//   type: `${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_FAILURE`,
//   payload: { publicKey },
// });

export const ACCOUNT_HANDLERS = {
  [STAKE_ACTIONS.DELEGATE_BY_ADDRESS]: delegateByAddress,
  // [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESS}_SUCCESS`]: delegateByAddressSuccess,
  // [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESS}_FAILURE`]: delegateByAddressFailure,
  [STAKE_ACTIONS.DELEGATE_BY_ADDRESSES]: delegateByAddresses,
  // [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_SUCCESS`]: delegateByAddressesSuccess,
  // [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_FAILURE`]: delegateByAddressesFailure,
  [STAKE_ACTIONS.VALIDATORS_LIST]: getValidatorsList,
  [`${STAKE_ACTIONS.VALIDATORS_LIST}_SUCCESS`]: setValidatorsList,
  [`${STAKE_ACTIONS.VALIDATORS_LIST}_FAILURE`]: getValidatorsListFailure,
  [STAKE_ACTIONS.DELEGATE_BY_STAKER_ID]: delegateByStakerId,
  [STAKE_ACTIONS.DELEGATE_AMOUNT]: delegateAmount,
};
