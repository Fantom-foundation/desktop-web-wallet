import { createReducer } from '~/utility/createReducer';
import { ACCOUNT_HANDLERS } from './handlers';
import { AccountCreateCredentials } from '~/view/pages/create-account/AccountCreateCredentials';
import { AccountCreateInfo } from '~/view/pages/create-account/AccountCreateInfo';
import { AccountCreateConfirm } from '~/view/pages/create-account/AccountCreateConfirm';
import { IAccount } from './types';

export const ACCOUNT_CREATION_STAGES = {
  CREDENTIALS: 0,
  INFO: 1,
  CONFIRM: 2,
};

export const ACCOUNT_CREATION_STAGES_COMPONENTS = {
  [ACCOUNT_CREATION_STAGES.CREDENTIALS]: AccountCreateCredentials,
  [ACCOUNT_CREATION_STAGES.INFO]: AccountCreateInfo,
  [ACCOUNT_CREATION_STAGES.CONFIRM]: AccountCreateConfirm,
};
export interface IAccountState {
  create: {
    stage: typeof ACCOUNT_CREATION_STAGES[keyof typeof ACCOUNT_CREATION_STAGES];
    name: string;
    password: string;
    icon: string;
    mnemonic: string;
    public_address: string;
    errors: Record<string, string>;
  };
  list: IAccount[];
}

export const ACCOUNT_INITIAL_STATE: IAccountState = {
  create: {
    stage: ACCOUNT_CREATION_STAGES.INFO,
    name: 'name',
    password: 'Puzzword12345',
    icon: '11572238206314',
    public_address: '',
    mnemonic: '',
    errors: {},
  },
  list: [],
};

export const account = createReducer(ACCOUNT_INITIAL_STATE, ACCOUNT_HANDLERS);
