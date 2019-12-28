//@ flow
import { assocPath } from 'ramda';
import {
  delegateByAddress,
  delegateByAddresses,
  getValidatorsList,
  delegateByStakerId,
  delegateAmount,
  STAKE_ACTIONS,
  delegateByAddressFailure,
  getValidatorsListSuccess,
  delegateByAddressSuccess,
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
) => ({ ...state, validators });

export const getValidatorsListFailure = () => ({
  type: `${STAKE_ACTIONS.VALIDATORS_LIST}_FAILURE`,
});

export const setDelegatorByAddress = (
  state: InitialStateType,
  { response }: ReturnType<typeof delegateByAddressSuccess>
) => {
  console.log(state, response, 'setDelegatorByAddress');
  return { ...state };
};

export const setDelegatorByAddressFailure = (
  state: InitialStateType,
  { publicKey }: ReturnType<typeof delegateByAddressFailure>
) => {
  const { data } = state;
  let stakes = data.slice();
  if (state && state.data.length > 0) {
    const selectedAddressIndex = stakes.findIndex(
      d => d.publicKey === publicKey
    );
    if (selectedAddressIndex > -1) {
      stakes.splice(1, selectedAddressIndex, {
        ...stakes[selectedAddressIndex],
        publicKey,
        isDeligated: false,
      });
    } else {
      stakes.push({
        publicKey,
        isDeligated: false,
        amount: 0,
        claimedRewards: 0,
      });
    }
  }
  return { ...state, stakes };
};

// export const setDelegatorByAddresses = ({
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
  [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESS}_SUCCESS`]: setDelegatorByAddress,
  [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESS}_FAILURE`]: setDelegatorByAddressFailure,
  [STAKE_ACTIONS.DELEGATE_BY_ADDRESSES]: delegateByAddresses,
  // [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_SUCCESS`]: setDelegatorByAddresses,
  // [`${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_FAILURE`]: delegateByAddressesFailure,
  [STAKE_ACTIONS.VALIDATORS_LIST]: getValidatorsList,
  [`${STAKE_ACTIONS.VALIDATORS_LIST}_SUCCESS`]: setValidatorsList,
  [`${STAKE_ACTIONS.VALIDATORS_LIST}_FAILURE`]: getValidatorsListFailure,
  [STAKE_ACTIONS.DELEGATE_BY_STAKER_ID]: delegateByStakerId,
  [STAKE_ACTIONS.DELEGATE_AMOUNT]: delegateAmount,
};
