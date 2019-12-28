// @flow


export const STAKE_ACTIONS = {
  DELEGATE_BY_ADDRESS: "staking/DELEGATE_BY_ADDRESS",
  DELEGATE_BY_ADDRESSES: "staking/DELEGATE_BY_ADDRESSES",
  DELEGATE_BY_STAKER_ID: "staking/DELEGATE_BY_STAKER_ID",
  VALIDATORS_LIST: "staking/VALIDATORS_LIST",
  DELEGATE_AMOUNT: "staking/DELEGATE_AMOUNT",
};

type TDelegateByStakerId = {
  stakerId: string
};

type TDelegateByAddress = {
  publicKey: string
};

export const delegateByAddress = ({ publicKey }: TDelegateByAddress) => ({
  type: STAKE_ACTIONS.DELEGATE_BY_ADDRESS,
  payload: { publicKey },
});

export const delegateByAddressSuccess = ({
  publicKey,
}: TDelegateByAddress) => ({
  type: `${STAKE_ACTIONS.DELEGATE_BY_ADDRESS}_SUCCESS`,
  payload: { publicKey },
});

export const delegateByAddressFailure = () => ({
  type: `${STAKE_ACTIONS.DELEGATE_BY_ADDRESS}_FAILURE`,
});

export const delegateByAddresses = () => ({
  type: STAKE_ACTIONS.DELEGATE_BY_ADDRESSES,
});

export const delegateByAddressesSuccess = ({
  publicKey,
}: TDelegateByAddress) => ({
  type: `${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_SUCCESS`,
  payload: { publicKey },
});

export const delegateByAddressesFailure = ({
  publicKey,
}: TDelegateByAddress) => ({
  type: `${STAKE_ACTIONS.DELEGATE_BY_ADDRESSES}_FAILURE`,
  payload: { publicKey },
});

export const getValidatorsList = () => ({
  type: STAKE_ACTIONS.VALIDATORS_LIST,
});

export const getValidatorsListSuccess = response => ({
  type: `${STAKE_ACTIONS.VALIDATORS_LIST}_SUCCESS`,
  payload: { response },
});

export const getValidatorsListFailure = () => ({
  type: `${STAKE_ACTIONS.VALIDATORS_LIST}_FAILURE`,
});

export const delegateByStakerId = ({ stakerId }: TDelegateByStakerId) => ({
  type: STAKE_ACTIONS.DELEGATE_BY_STAKER_ID,
  payload: { stakerId },
});

export const delegateAmount = ({ amount, publicKey }) => ({
  type: STAKE_ACTIONS.DELEGATE_AMOUNT,
  payload: { amount, publicKey },
});
