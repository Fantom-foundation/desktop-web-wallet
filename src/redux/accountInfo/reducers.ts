import * as types from '~/redux/constants';

export type IAccountInfoState = Readonly<{
  stepNo: number;
  accountName: string;
  password: string;
  selectedIcon: string;
  mnemonic: string;
}>;

const INITIAL_STATE: IAccountInfoState = { stepNo: 1, accountName: '', password: '', selectedIcon: '', mnemonic: '' };

const accountInfo = (state = INITIAL_STATE, action): IAccountInfoState => {
  const { payload } = action;
  switch (action.type) {
    case types.CREATE_NEW_ACCOUNT: {
      return {
        ...state,
        accountName: payload.accountName,
        password: payload.password,
        selectedIcon: payload.selectedIcon,
      };
    }

    case types.MNEMONIC_CODE: {
      return { ...state, mnemonic: payload.mnemonic };
    }

    case types.INCREMENT_STEP_NO: {
      return { ...state, stepNo: payload.stepNo };
    }

    case types.EMPTY_STATE: {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
};

export default accountInfo;
