// // @flow

import { createReducer } from '~/utility/createReducer';
import { ACCOUNT_HANDLERS } from './handlers';
import { STAKE_ACTIONS } from './actions';

export type TStakeObj = {
  publicKey: string;
  amount: number;
  claimedRewards: number;
};
export type TValidatorObj = {
  publicKey: string;
  amount: number;
  claimedRewards: number;
};

export interface InitialStateType {
  data: Array<TStakeObj>;
  validators: Array<TValidatorObj>;
}

export const MODAL_INITIAL_STATE: InitialStateType = {
  data: [],
  validators: [],
};

export const stakes = createReducer(MODAL_INITIAL_STATE, ACCOUNT_HANDLERS);

// import { STAKE_ACTIONS as types } from "./actions";
// // import { IAccountState  } from '.';

// export type KeyReducerT = {
//   publicKey: string,
//   amount: number,
//   claimedRewards: number,
// };

// type KeyStateT = Array<KeyReducerT>;
// type InitialStateType = {
//   data: KeyStateT,
//   validators: KeyStateT
// }

// type Action = {
//   type: string,
//   payload: KeyReducerT
// };

// const initialState = {
//   data: [{publicKey:' '}],
//   validators: [],
// };

// const StakeReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case `${types.DELEGATE_BY_ADDRESSES}_SUCCESS`: {
//       const oldStakes = [...state.data];
//       const { publicKey, response } = action.payload;
//       const { amount, claimedRewards, deactivatedTime } = response;
//       const index = oldStakes.findIndex(item=> item.publicKey === publicKey);
//       const data = {
//         amount,
//         claimedRewards,
//         isDeligate: true,
//         deactivatedTime,
//       };
//       if (index > -1) {
//         const updatedStake = {
//           ...oldStakes[index],
//           ...data,
//         };
//         oldStakes.splice(index, 1, updatedStake);
//       } else {
//         const stake = {
//           publicKey,
//           ...data,
//         };
//         oldStakes.push(stake);
//       }
//       return {
//         ...state,
//         data: oldStakes,
//       };
//     }
//     case `${types.DELEGATE_BY_ADDRESSES}_FAILURE`: {
//       console.log("types.DELEGATE_BY_ADDRESSES", action.payload);
//       const oldStakes = [...state.data];
//       const { publicKey } = action.payload;
//       const data = {
//         publicKey,
//         isDeligate: false,
//         amount: 0,
//         claimedRewards: 0,
//       };
//       const index = oldStakes.findIndex(item => item.publicKey === publicKey);
//       if (index === -1) oldStakes.push(data);
//       return {
//         ...state,
//         data: oldStakes,
//       };
//     }
//     case `${types.VALIDATORS_LIST}_SUCCESS`: {
//       console.log("types.VALIDATORS_LIST", action.payload);
//       const { stakers } = action.payload.response.data.data;

//       const validators = stakers.map(staker => {
//         const {
//           id,
//           address,
//           totalStake,
//           deactivatedEpoch,
//           delegatedMe,
//           deactivatedTime,
//         } = staker;
//         return {
//           id,
//           address,
//           totalStake,
//           deactivatedEpoch,
//           delegatedMe,
//         };
//       });
//       return {
//         ...state,
//         validators,
//       };
//     }
//     case `${types.VALIDATORS_LIST}_FAILURE`: {
//       return state;
//     }
//     default:
//       return state;
//   }
// };

// export default StakeReducer;
